import { Injectable } from '@nestjs/common';
import { MockHelper } from 'src/commons/mock/MockHelper';
import { DatabaseService } from 'src/database/DatabaseService';

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
}
