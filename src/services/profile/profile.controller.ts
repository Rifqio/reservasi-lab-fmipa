import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { Lecturers, Students } from '@prisma/client';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { RoleGuard } from 'src/server/guard/role.guard';
import { ApiRequest } from 'src/server/request/api.request';
import { SuccessResponse } from 'src/server/response/success.response';
import { UserRole } from '../auth/dto/user-role.enum';
import { UpdateLecturerProfileRequest, UpdateStudentProfileRequest } from './dto/request';
import { LecturerProfile } from './dto/response/lecturer-profile.response';
import { StudentProfile } from './dto/response/student-profile.response';
import { ProfileService } from './profile.service';

@Controller('api/v1/profile')
@UseGuards(RoleGuard)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    // prettier-ignore
    @Get()
    @Roles(UserRole.STUDENT, UserRole.LECTURER)
    public async getProfile(@Request() request: ApiRequest) : Promise<SuccessResponse<StudentProfile | LecturerProfile>> {
        const profile = await this.profileService.getProfile(request);
        return SuccessResponse.success('Profile has been fetched', profile);
    }

    // prettier-ignore
    @Patch('student')
    @Roles(UserRole.STUDENT)
    public async updateProfileStudent(@Request() request: ApiRequest, @Body() payload: UpdateStudentProfileRequest) : Promise<SuccessResponse<Students>> {
        const student = await this.profileService.updateProfileStudent(request, payload);
        return SuccessResponse.success('Student profile has been updated', student);
    }

    // prettier-ignore
    @Patch('lecturer')
    @Roles(UserRole.LECTURER)
    public async updateProfileLecturer(@Request() request: ApiRequest, @Body() payload: UpdateLecturerProfileRequest) : Promise<SuccessResponse<Lecturers>>{
        const lecturer = await this.profileService.updateProfileLecturer(request, payload);
        return SuccessResponse.success('Lecturer profile has been updated', lecturer);
    }
}
