import { Body, Controller, Get, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { SampleService } from './sample.service';
import { CreateSampleRequest } from './dto/request';
import { CreateSampleResponse } from './dto/response';
import { ApiRequest } from 'src/server/request';
import { SuccessResponse } from 'src/server/response';
import { RoleGuard } from 'src/server/guard';
import { Roles } from 'src/commons/decorators';
import { UserRole } from '../auth/dto';

@Controller('api/v1/sample')
@UseGuards(RoleGuard)
export class SampleController {
    private logger = new Logger(SampleController.name);
    constructor(private readonly sampleService: SampleService) {}

    @Post()
    @Roles(UserRole.STUDENT)
    public async createTestSample(@Request() request: ApiRequest, @Body() payload: CreateSampleRequest) : Promise<SuccessResponse<CreateSampleResponse>> {
        const email = request.user.email;
        const sample = await this.sampleService.createTestSample(email, payload);
        this.logger.log(`Sample test has been created with invoice number: ${sample.invoiceNumber} and letter number: ${sample.letterNumber}`);
        return SuccessResponse.successWithData('Sample test has been created', sample);
    }

    @Get()
    public async getTestSample() {}
}
