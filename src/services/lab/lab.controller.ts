import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { LabService } from './lab.service';
import { LabReservationRequest, LabClearanceRequest, LabVerifyRequest } from './dto/request';
import { RoleGuard } from 'src/server/guard/role.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { UserRole } from '../auth/dto/user-role.enum';
import { ApiRequest } from 'src/server/request';
import { SuccessResponse } from 'src/server/response';
import { CurrentLabReservationResponse, LabReservationResponse, RequestClearanceResponse } from './dto/response';

@Controller('api/v1/lab')
@UseGuards(RoleGuard)
export class LabController {
    constructor(private readonly labService: LabService) {}

    @Post('reservation')
    @Roles(UserRole.STUDENT)
    public async reserveLab(@Request() req: ApiRequest, @Body() body: LabReservationRequest) : Promise<SuccessResponse<LabReservationResponse>> {
        const reservation = await this.labService.reserveLab(body, req.user.nim);
        const reservationId = new LabReservationResponse(reservation);
        return SuccessResponse.successWithData('Lab reservation success', reservationId);
    }

    @Get('reservation')
    @Roles(UserRole.STUDENT, UserRole.ADMIN)
    public async getCurrentReservation(@Request() req: ApiRequest) : Promise<SuccessResponse<Array<CurrentLabReservationResponse>>> {
        const reservation = await this.labService.getCurrentReservation(req);
        return SuccessResponse.successWithData('Current reservation fetched', reservation);
    }

    @Post('clearance')
    @Roles(UserRole.STUDENT)
    public async requestClearance(@Request() req: ApiRequest, @Body() payload: LabClearanceRequest) : Promise<SuccessResponse<RequestClearanceResponse>> {
        const clearance = await this.labService.requestClearance(payload, req.user.nim);
        const response = new RequestClearanceResponse(clearance);
        return SuccessResponse.successWithData('Clearance request success', response);
    }

    @Patch('reservation/verify/:id')
    @Roles(UserRole.ADMIN)
    public async verifyLabReservation(@Body() payload: LabVerifyRequest, @Param() id: string) {
        await this.labService.verifyLabReservation(payload, id);
        return SuccessResponse.success('Lab reservation has been verified');
    }
}
