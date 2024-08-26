import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Public } from 'src/commons/decorators';
import { SuccessResponse } from 'src/server/response';

@Controller('api/v1/seed')
@Public()
export class SeedController {
    constructor(private readonly seedService: SeedService) {}

    @Post('study-programs')
    public async seedStudyPrograms() : Promise<SuccessResponse<void>> {
        await this.seedService.seedStudyPrograms();
        return SuccessResponse.success('Study programs has been seeded');
    }

    @Post('labs')
    public async seedLabs() : Promise<SuccessResponse<void>> {
        await this.seedService.seedLabs();
        return SuccessResponse.success('Labs has been seeded');
    }

    @Post('lab-tools')
    public async seedLabTools() : Promise<SuccessResponse<void>> {
        await this.seedService.seedLabTools();
        return SuccessResponse.success('Lab tools has been seeded');
    }
}
