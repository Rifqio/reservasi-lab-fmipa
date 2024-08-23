import { Injectable, Request } from '@nestjs/common';
import { LecturerRepositories } from 'src/repositories/lecturer.repositories';
import { StudentRepositories } from 'src/repositories/student.repositories';
import { ApiRequest } from 'src/server/request/api.request';
import { UpdateLecturerProfileRequest, UpdateStudentProfileRequest } from './dto/request';
import { Lecturers, Students } from '@prisma/client';
import { UserRole } from '../auth/dto/user-role.enum';
import { StudentProfile } from './dto/response/student-profile.response';
import { LecturerProfile } from './dto/response/lecturer-profile.response';

@Injectable()
export class ProfileService {
    constructor(private studentRepository: StudentRepositories, private lecturerRepository: LecturerRepositories) {}

    public async getProfile(@Request() request: ApiRequest) {
        const role = request.user.role;
        if (role === UserRole.STUDENT) {
            return await this.getProfileStudent(request.user.email);
        } else {
            return await this.getProfileLecturer(request.user.email);
        }
    }

    // prettier-ignore
    public async updateProfileStudent(@Request() request: ApiRequest, payload: UpdateStudentProfileRequest) : Promise<Students> {
        const student = await this.studentRepository.updateProfileByEmail(payload, request.user.email);
        return student;
    }

    // prettier-ignore
    public async updateProfileLecturer(@Request() request: ApiRequest, payload: UpdateLecturerProfileRequest) : Promise<Lecturers> {
        const lecturer = await this.lecturerRepository.updateNipByEmail(payload.nip, request.user.email);
        return lecturer;
    }

    // prettier-ignore
    private async getProfileStudent(email: string) : Promise<StudentProfile> {
        const student = await this.studentRepository.findStudentByEmailWithDetails(email);
        const profile = new StudentProfile({
            batch: student.batch,
            full_name: student.User.full_name,
            nim: student.nim,
            phone_number: student.phone_number,
            study_program: student.study_program,
            user_email: student.user_email,
        });
        return profile;
    }

    private async getProfileLecturer(email: string) : Promise<LecturerProfile> {
        const lecturer = await this.lecturerRepository.findLecturerByEmailWithDetails(email);
        const profile = new LecturerProfile({
            full_name: 'lecturer.User.full_name',
            nip: lecturer.nip,
            user_email: lecturer.user_email,
        });
        return profile;
    }
}
