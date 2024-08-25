import { Injectable } from '@nestjs/common';
import { MockHelper } from 'src/commons/mock/mock-helper';
import { Utils } from 'src/commons/utils';
import { DatabaseService } from 'src/database/database.service.';
import { RegisterRequestDTO } from 'src/services/auth/dto/request';
import { PrismaPromise } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { UserRole } from 'src/services/auth/dto/user-role.enum';

@Injectable()
export class AuthRepositories {
    constructor(private readonly db: DatabaseService) {}

    public async createUserStudent(payload: RegisterRequestDTO, role: UserRole.STUDENT): Promise<string> {
        const mockStudent = MockHelper.mockStudentProfile();
        return this.createUser(
            payload,
            role,
            this.db.students.create({
                data: {
                    user_email: payload.email,
                    nim: mockStudent.nim,
                    phone_number: mockStudent.phone_number,
                    batch: mockStudent.batch,
                },
            }),
        );
    }

    public async createUserLecturer(payload: RegisterRequestDTO, role: UserRole.LECTURER): Promise<string> {
        const mockLecturer = MockHelper.mockLecturerProfile();
        return this.createUser(
            payload,
            role,
            this.db.lecturers.create({
                data: {
                    user_email: payload.email,
                    nip: mockLecturer.nip,
                },
            }),
        );
    }

    private async createUser(payload: RegisterRequestDTO, role: UserRole, additionalDataCreation: PrismaPromise<any>): Promise<string> {
        const userCreation = this.db.users.create({
            data: {
                id_user: faker.string.uuid(),
                email: payload.email,
                full_name: payload.fullName,
                is_email_verified: true, // For the sake of testing, we assume that the email is always verified
                password: payload.password,
                role: role,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        const [user] = await this.db.$transaction([
            userCreation,
            additionalDataCreation,
        ]);
        return user.id_user;
    }

    public async findExistingUser(email: string) {
        return this.db.users.findFirst({
            where: { email },
        });
    }
}
