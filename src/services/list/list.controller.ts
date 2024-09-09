import { Controller, Get, Logger, Query } from '@nestjs/common';
import { BusinessException } from 'src/server/exception/business.exception';
import { SuccessResponse } from 'src/server/response/success.response';
import { ListRequestType } from './dto/request';
import { ListResponse } from './dto/response';
import { ListService } from './list.service';

@Controller('api/v1/list')
export class ListController {
    constructor(private readonly listService: ListService) {}
    private readonly logger = new Logger(ListController.name);

    @Get()
    public async getLists(@Query('type') type: ListRequestType, @Query('labName') labName: string) : Promise<SuccessResponse<Array<ListResponse>>> {
        this.logger.debug(`Get list with type ${type} and lab name ${labName}`);
        if (type === ListRequestType.LAB_TOOLS && !labName) {
            throw BusinessException.labNameRequired();
        }

        const list = await this.listService.getLists(type, labName);
        return SuccessResponse.success('List retrieved successfully', list);
    }
}
