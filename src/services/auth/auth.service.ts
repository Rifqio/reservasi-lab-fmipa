import { Injectable } from '@nestjs/common';
import { LoginRequestDTO, RegisterRequestDTO } from './dto/request';
import { AuthException } from 'src/server/exception/auth.exception';
import { UserRole } from './dto/user-role.enum';
import { AuthRepositories } from 'src/database/repositories/auth.repositories';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StudentRepositories } from 'src/database/repositories/student.repositories';
import { Users } from '@prisma/client';
import { TokenPayload } from './dto/token-payload';
import { LecturerRepositories } from 'src/database/repositories/lecturer.repositories';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private authRepository: AuthRepositories,
        private studentRepository: StudentRepositories,
        private lecturerRepository: LecturerRepositories,
    ) {}

    public async register(payload: RegisterRequestDTO): Promise<string> {
        const user = await this.findExistingUser(payload.email);
        if (user) throw AuthException.userAlreadyExists();

        let userId: string;
        payload.password = await this.hashPassword(payload.password);
        if (payload.role === UserRole.STUDENT) {
            userId = await this.authRepository.createUserStudent(payload);
        } else {
            userId = await this.authRepository.createUserLecturer(payload);
        }

        return userId;
    }

    public async login(payload: LoginRequestDTO) : Promise<string> {
        const user = await this.authRepository.findExistingUser(payload.email);
        if (!user) throw AuthException.userNotFound();
        if (user.is_email_verified === false) throw AuthException.emailNotVerified();

        const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
        if (!isPasswordMatch) throw AuthException.invalidPassword();

        if (user.role === UserRole.STUDENT) {
            const student = await this.studentRepository.findStudentByEmail(payload.email);
            return await this.generateToken(user, student.nim, UserRole.STUDENT);
        } else {
            const lecturer = await this.lecturerRepository.findLecturerByEmail(payload.email);
            return await this.generateToken(user, lecturer.nip, UserRole.LECTURER);
        }
    }

    public async findExistingUser (email: string) : Promise<Users> {
        return await this.authRepository.findExistingUser(email);
    }

    private async generateToken(user: Users, identity: string, role: UserRole) : Promise<string> {
        const jwtPayload = {
            sub: user.id_user,
            email: user.email,
            role: user.role as UserRole,
            nim: role === UserRole.STUDENT ? identity : '-',
            nip: role === UserRole.STUDENT ? '-' : identity,
        } as TokenPayload;
        
        return this.jwtService.signAsync(jwtPayload);
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
}
