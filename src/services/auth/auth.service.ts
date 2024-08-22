import { Injectable } from '@nestjs/common';
import { RegisterRequestDTO } from './dto/request';
import { AuthException } from 'src/commons/exception/AuthException';
import { UserRole } from './dto/user-role.enum';
import { AuthRepositories } from 'src/repositories/auth.repositories';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepositories) {}

    async register(payload: RegisterRequestDTO): Promise<string> {
        const user = await this.authRepository.findExistingUser(payload.email);
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

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
}
