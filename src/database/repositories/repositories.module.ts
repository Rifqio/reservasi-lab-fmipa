import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service.';
import { UserRepositories } from './user.repositories';
import { LecturerRepositories } from './lecturer.repositories';
import { AuthRepositories } from './auth.repositories';
import { StudentRepositories } from './student.repositories';
import { StudyProgramRepositories } from './study-program.repositories';
import { LabReservationRepositories } from './lab-reservation.repositories';
import { LabClearanceRepositories } from './lab-clearance.repositories';
import { LabsRepositories } from './labs.repositories';

@Module({
    exports: [
        DatabaseService,
        UserRepositories,
        LecturerRepositories,
        AuthRepositories,
        StudentRepositories,
        LabReservationRepositories,
        LabsRepositories,
        LabClearanceRepositories,
        StudyProgramRepositories
    ],
    providers: [
        DatabaseService,
        UserRepositories,
        LecturerRepositories,
        AuthRepositories,
        StudentRepositories,
        LabReservationRepositories,
        LabsRepositories,
        LabClearanceRepositories,
        StudyProgramRepositories
    ],
})
export class RepositoriesModule {}
