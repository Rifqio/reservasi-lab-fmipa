import { Injectable } from '@nestjs/common';
import { LabsRepositories } from 'src/database/repositories/labs.repositories';
import { StudyProgramRepositories } from 'src/database/repositories/study-program.repositories';
import { Seed } from './resource/seed';

@Injectable()
export class SeedService {
    constructor(
        private studyProgramsRepository: StudyProgramRepositories,
        private labRepository: LabsRepositories,
    ) {}
    
    public async seedStudyPrograms() {
        await this.studyProgramsRepository.createBatch(Seed.studyProgramsData());
    }

    public async seedLabs() {
        await this.labRepository.createBatch(Seed.labsData());
    }
}
