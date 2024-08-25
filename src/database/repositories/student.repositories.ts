import { Injectable } from '@nestjs/common';
import { Students } from '@prisma/client';
import { MockHelper } from 'src/commons/mock/mock-helper';
import { DatabaseService } from 'src/database/database.service.';
import { UpdateStudentProfileRequest } from 'src/services/profile/dto/request';
import { StudentProfile } from 'src/services/profile/dto/response/student-profile.response';

@Injectable()
export class StudentRepositories {
    constructor(private readonly db: DatabaseService) {}

    public async initStudent(email: string) {
        const mockStudent = MockHelper.mockStudentProfile();
        return await this.db.students.create({
            data: {
                user_email: email,
                nim: mockStudent.nim,
                phone_number: mockStudent.phone_number,
                batch: mockStudent.batch,
            },
        });
    }

    public async findStudentByEmailWithDetails(email: string) : Promise<StudentProfile> {
        const student = await this.db.students.findFirst({
            where: {
                user_email: email,
            },
            select: {
                nim: true,
                phone_number: true,
                batch: true,
                study_program: true,
                user_email: true,
                User: {
                    select: {
                        full_name: true,
                    }
                }
            }
        });

        return new StudentProfile({
            batch: student.batch,
            fullName: student.User.full_name,
            nim: student.nim,
            phoneNumber: student.phone_number,
            studyProgram: student.study_program,
            userEmail: student.user_email,
        })
    }

    public async findStudentByEmail(email: string): Promise<Students> {
        return await this.db.students.findFirst({
            where: {
                user_email: email,
            },
        });
    }

    // prettier-ignore
    public async updateNimByEmail(nim: string, email: string): Promise<Students> {
        return await this.db.students.update({
            where: {
                user_email: email,
            },
            data: {
                nim: nim,
            },
        });
    }

    // prettier-ignore
    public async updateProfileByEmail(payload: UpdateStudentProfileRequest, email: string): Promise<Students> {
        return await this.db.students.update({
            where: {
                user_email: email,
            },
            data: {
                nim: payload.nim,
                phone_number: payload.phoneNumber,
                batch: payload.batch,
                study_program: payload.studyProgram,
            },
        });
    }
}
