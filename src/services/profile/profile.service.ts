import { Injectable, Request } from '@nestjs/common';
import { LecturerRepositories } from 'src/database/repositories/lecturer.repositories';
import { StudentRepositories } from 'src/database/repositories/student.repositories';
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
        return await this.studentRepository.updateProfileByEmail(payload, request.user.email);
    }

    // prettier-ignore
    public async updateProfileLecturer(@Request() request: ApiRequest, payload: UpdateLecturerProfileRequest) : Promise<Lecturers> {
        return await this.lecturerRepository.updateNipByEmail(payload.nip, request.user.email);
    }

    // prettier-ignore
    private async getProfileStudent(email: string) : Promise<StudentProfile> {
        return await this.studentRepository.findStudentByEmailWithDetails(email);
    }

    private async getProfileLecturer(email: string) : Promise<LecturerProfile> {
        return await this.lecturerRepository.findLecturerByEmailWithDetails(email);
    }
}
