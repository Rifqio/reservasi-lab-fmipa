import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { RepositoriesModule } from 'src/database/repositories/repositories.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        RepositoriesModule,
        MulterModule.register({
            dest: './assets',
        }),
    ],
    controllers: [SampleController],
    providers: [SampleService],
})
export class SampleModule {}
