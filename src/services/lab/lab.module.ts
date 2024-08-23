import { Module } from '@nestjs/common';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { RepositoriesModule } from 'src/database/repositories/repositories.module';

@Module({
    controllers: [LabController],
    providers: [LabService, RepositoriesModule],
})
export class LabModule {}
