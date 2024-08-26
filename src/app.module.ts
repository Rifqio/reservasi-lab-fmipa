import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './services/auth/auth.module';
import { ProfileModule } from './services/profile/profile.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './server/guard/auth.guard';
import { ListModule } from './services/list/list.module';
import { SampleModule } from './services/sample/sample.module';
import { LabModule } from './services/lab/lab.module';
import { SeedModule } from './services/seed/seed.module';
import { RequestLoggerMiddleware } from './server/middleware';

@Module({
    imports: [AuthModule, ProfileModule, ListModule, SampleModule, LabModule, SeedModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
}
