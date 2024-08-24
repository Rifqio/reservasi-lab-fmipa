import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Config } from 'src/config/config';
import { RepositoriesModule } from 'src/database/repositories/repositories.module';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            // secret: Config.JWT_SECRET,
            // verifyOptions: { issuer: Config.JWT_ISSUER },
        }),
        RepositoriesModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
