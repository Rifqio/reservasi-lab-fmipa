import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RepositoriesModule } from 'src/database/repositories/repositories.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [JwtModule.register({ global: true }), RepositoriesModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
