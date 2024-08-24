import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RepositoriesModule } from 'src/database/repositories/repositories.module';

@Module({
    imports: [RepositoriesModule],
    controllers: [SeedController],
    providers: [SeedService],
})
export class SeedModule {}
