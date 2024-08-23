import { Body, Controller, Get, Logger, Patch, Request, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiRequest } from 'src/server/request/api.request';
import { UpdateLecturerProfileRequest, UpdateStudentProfileRequest } from './dto/request';
import { Lecturers, Students } from '@prisma/client';
import { SuccessResponse } from 'src/server/response/success.response';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '../auth/dto/user-role.enum';
import { RoleGuard } from 'src/server/guard/role.guard';


@Controller('api/v1/profile')
@UseGuards(RoleGuard)
export class ProfileController {
    private logger = new Logger(ProfileController.name);
    constructor(private readonly profileService: ProfileService) {}


    @Get()
    public async getProfile(@Request() request: ApiRequest) {
        const profile = await this.profileService.getProfile(request);
        return SuccessResponse.successWithData('Profile has been fetched', profile);
    }

    // prettier-ignore
    @Patch('student')
    @Roles(UserRole.STUDENT)
    public async updateProfileStudent(@Request() request: ApiRequest, @Body() payload: UpdateStudentProfileRequest) : Promise<SuccessResponse<Students>> {
        const student = await this.profileService.updateProfileStudent(request, payload);
        return SuccessResponse.successWithData('Student profile has been updated', student);
    }

    // prettier-ignore
    @Patch('lecturer')
    @Roles(UserRole.LECTURER)
    public async updateProfileLecturer(@Request() request: ApiRequest, @Body() payload: UpdateLecturerProfileRequest) : Promise<SuccessResponse<Lecturers>>{
        const lecturer = await this.profileService.updateProfileLecturer(request, payload);
        return SuccessResponse.successWithData('Lecturer profile has been updated', lecturer);
    }
}
