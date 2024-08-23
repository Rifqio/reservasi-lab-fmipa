import { Controller, Get, Query } from '@nestjs/common';
import { ListService } from './list.service';
import { ListRequestType } from './dto/request';
import { SuccessResponse } from 'src/server/response/success.response';
import { ListResponse } from './dto/response';

@Controller('api/v1/list')
export class ListController {
    constructor(private readonly listService: ListService) {}

    @Get()
    public async getLists(@Query('type') type: ListRequestType) : Promise<SuccessResponse<Array<ListResponse>>> {
        const list = await this.listService.getLists(type);
        return SuccessResponse.successWithData('List retrieved successfully', list);
    }
}
