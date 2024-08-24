import { Module } from '@nestjs/common';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { RepositoriesModule } from 'src/database/repositories/repositories.module';

@Module({
    imports: [RepositoriesModule],
    controllers: [LabController],
    providers: [LabService],
})
export class LabModule {}
