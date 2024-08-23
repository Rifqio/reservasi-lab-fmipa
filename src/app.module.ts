import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './services/auth/auth.module';
import { ProfileModule } from './services/profile/profile.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './server/guard/auth.guard';
import { ListModule } from './services/list/list.module';
import { SampleModule } from './services/sample/sample.module';
import { LabModule } from './services/lab/lab.module';

@Module({
    imports: [AuthModule, ProfileModule, ListModule, SampleModule, LabModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
