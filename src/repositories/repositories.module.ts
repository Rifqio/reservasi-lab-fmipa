import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service.';
import { UserRepositories } from './user.repositories';
import { LecturerRepositories } from './lecturer.repositories';
import { AuthRepositories } from './auth.repositories';
import { StudentRepositories } from './student.repositories';

@Module({
    exports: [
        DatabaseService,
        UserRepositories,
        LecturerRepositories,
        AuthRepositories,
        StudentRepositories
    ],
    providers: [
        DatabaseService,
        UserRepositories,
        LecturerRepositories,
        AuthRepositories,
        StudentRepositories
    ],
})
export class RepositoriesModule {}
