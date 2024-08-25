import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { RepositoriesModule } from 'src/database/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
