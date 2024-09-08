import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Encryption } from 'src/commons/encryption';
import { Utils } from 'src/commons/utils';
import { Config } from 'src/config/config';
import { AuthRepositories } from 'src/database/repositories/auth.repositories';
import { LecturerRepositories } from 'src/database/repositories/lecturer.repositories';
import { StudentRepositories } from 'src/database/repositories/student.repositories';
import { AuthException } from 'src/server/exception/auth.exception';
import { LoginRequestDTO, LoginResponse, RegisterRequestDTO, TokenPayload, UserRole } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private authRepository: AuthRepositories,
        private studentRepository: StudentRepositories,
        private lecturerRepository: LecturerRepositories,
    ) {}

    private logger = new Logger(AuthService.name);

    public async register(payload: RegisterRequestDTO): Promise<string> {
        const user = await this.findExistingUser(payload.email);
        if (user) throw AuthException.userAlreadyExists();

        let userId: string;
        payload.password = await this.hashPassword(payload.password);

        if (Utils.isEmailStudent(payload.email)) {
            userId = await this.authRepository.createUserStudent(payload, UserRole.STUDENT);
        } else {
            userId = await this.authRepository.createUserLecturer(payload, UserRole.LECTURER);
        }

        return userId;
    }

    public async login(payload: LoginRequestDTO): Promise<LoginResponse> {
        const user = await this.authRepository.findExistingUser(payload.email);
        if (!user) throw AuthException.userNotFound();
        if (user.is_email_verified === false) throw AuthException.emailNotVerified();

        const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
        if (!isPasswordMatch) throw AuthException.invalidPassword();

        if (user.role === UserRole.STUDENT) {
            const student = await this.studentRepository.findStudentByEmail(payload.email);
            return this.generateToken(user, student.nim, UserRole.STUDENT);
        } else {
            const lecturer = await this.lecturerRepository.findLecturerByEmail(payload.email);
            return this.generateToken(user, lecturer.nip, UserRole.LECTURER);
        }
    }

    public async refreshToken(refreshToken: string): Promise<LoginResponse> {
        const payload = this.verifyRefreshToken(refreshToken);
        const user = await this.authRepository.findExistingUser(payload.email);
        if (!user) throw AuthException.userNotFound();

        if (user.role === UserRole.STUDENT) {
            const student = await this.studentRepository.findStudentByEmail(payload.email);
            return this.generateToken(user, student.nim, UserRole.STUDENT);
        } else {
            const lecturer = await this.lecturerRepository.findLecturerByEmail(payload.email);
            return this.generateToken(user, lecturer.nip, UserRole.LECTURER);
        }
    }

    private verifyRefreshToken(refreshToken: string): TokenPayload {
        try {
            const decryptedRefreshToken = Encryption.decrypt(refreshToken);
            return this.jwtService.verify(decryptedRefreshToken, {
                secret: Config.JWT_REFRESH_SECRET,
                issuer: Config.JWT_ISSUER,
                audience: Config.JWT_AUDIENCE,
            });            
        } catch (error) {
            this.logger.error(error);
            throw AuthException.unauthorized();
        }
    }

    private async findExistingUser(email: string): Promise<Users> {
        return await this.authRepository.findExistingUser(email);
    }

    private generateToken(user: Users, identity: string, role: UserRole): LoginResponse {
        const accessToken = this.generateAccessToken(user, identity, role);
        const refreshToken = this.generateRefreshToken(user);

        const encryptedAccessToken = Encryption.encrypt(accessToken);
        const encryptedRefreshToken = Encryption.encrypt(refreshToken);
        return new LoginResponse(encryptedAccessToken, encryptedRefreshToken, role);
    }

    private generateRefreshToken(user: Users): string {
        const payload = this.generateRefreshTokenPayload(user);
        return this.jwtService.sign(payload, {
            expiresIn: Config.JWT_REFRESH_EXPIRES_IN,
            issuer: Config.JWT_ISSUER,
            audience: Config.JWT_AUDIENCE,
            secret: Config.JWT_REFRESH_SECRET,
        });
    }

    private generateAccessToken(user: Users, identity: string, role: UserRole): string {
        const payload = this.generateAccessTokenPayload(user, identity, role);
        return this.jwtService.sign(payload, {
            expiresIn: Config.JWT_EXPIRES_IN,
            issuer: Config.JWT_ISSUER,
            audience: Config.JWT_AUDIENCE,
            secret: Config.JWT_SECRET,
        });
    }

    private generateRefreshTokenPayload(user: Users): TokenPayload {
        return {
            sub: user.id_user,
            email: user.email,
            role: user.role as UserRole,
        };
    }

    private generateAccessTokenPayload(user: Users, identity: string, role: UserRole): TokenPayload {
        return {
            sub: user.id_user,
            email: user.email,
            role: user.role as UserRole,
            nim: role === UserRole.STUDENT ? identity : '-',
            nip: role === UserRole.STUDENT ? '-' : identity,
        };
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
}
