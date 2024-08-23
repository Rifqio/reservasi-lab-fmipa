import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service.';
import { UserRepositories } from './user.repositories';
import { LecturerRepositories } from './lecturer.repositories';
import { AuthRepositories } from './auth.repositories';
import { StudentRepositories } from './student.repositories';
import { StudyProgramRepositories } from './study-program.repositories';

@Module({
    exports: [
        DatabaseService,
        UserRepositories,
        LecturerRepositories,
        AuthRepositories,
        StudentRepositories,
        StudyProgramRepositories
    ],
    providers: [
        DatabaseService,
        UserRepositories,
        LecturerRepositories,
        AuthRepositories,
        StudentRepositories,
        StudyProgramRepositories
    ],
})
export class RepositoriesModule {}
