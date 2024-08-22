import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseService } from 'src/database/DatabaseService';
import { AuthRepositories } from 'src/repositories/auth.repositories';

@Module({
    controllers: [AuthController],
    providers: [AuthService, DatabaseService, AuthRepositories],
})
export class AuthModule {}
