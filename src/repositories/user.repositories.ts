import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { randomUUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service.';
import { RegisterRequestDTO } from 'src/services/auth/dto/request';

@Injectable()
export class UserRepositories {
    constructor(private readonly db: DatabaseService) {}

    public async createUser(payload: RegisterRequestDTO) {
        const uuid = randomUUID();
        return await this.db.users.create({
            data: {
                id_user: uuid,
                email: payload.email,
                full_name: payload.full_name,
                is_email_verified: false,
                password: payload.password,
                role: payload.role as unknown as Role,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });
    }

    public async findUserByEmail(email: string) {
        return await this.db.users.findFirst({
            where: {
                email,
            },
        });
    }
}
