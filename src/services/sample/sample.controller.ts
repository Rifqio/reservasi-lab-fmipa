import {
    Body,
    Controller,
    Get,
    Logger,
    Post,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/commons/decorators';
import { FileValidationPipe } from 'src/commons/file-validation';
import { RoleGuard } from 'src/server/guard';
import { ApiRequest } from 'src/server/request';
import { SuccessResponse } from 'src/server/response';
import { UserRole } from '../auth/dto';
import { CreateSampleRequest } from './dto/request';
import { CreateSampleResponse } from './dto/response';
import { SampleService } from './sample.service';

@Controller('v1/sample')
@UseGuards(RoleGuard)
export class SampleController {
    private logger = new Logger(SampleController.name);
    constructor(private readonly sampleService: SampleService) {}

    // prettier-ignore
    @Post()
    @Roles(UserRole.STUDENT)
    public async createTestSample(@Request() request: ApiRequest, @Body() payload: CreateSampleRequest) : Promise<SuccessResponse<CreateSampleResponse>> {
        const email = request.user.email;
        const sample = await this.sampleService.createTestSample(email, payload);
        this.logger.log(`Sample test has been created with invoice number: ${sample.invoiceNumber} and letter number: ${sample.letterNumber}`);
        return SuccessResponse.success('Sample test has been created', sample);
    }

    @Post('payment')
    @Roles(UserRole.STUDENT)
    @UseInterceptors(FileInterceptor('payment_file'))
    @UsePipes(FileValidationPipe)
    public async payTestSample(
        @Request() request: ApiRequest,
        // @Body() payload: PaymentSampleRequest,  
        @UploadedFile() file: Express.Multer.File,
    ) {
        this.logger.debug(`File uploaded: ${file.originalname}`);
        // this.logger.debug(JSON.stringify(payload));
        // const email = request.user.email;
        return file;
        // await this.sampleService.payTestSample(email);
        // return SuccessResponse.success('Sample test has been paid');
    }

    @Get()
    public async getTestSample() {}
}
