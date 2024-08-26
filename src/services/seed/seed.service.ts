import { Injectable } from '@nestjs/common';
import { LabsRepositories } from 'src/database/repositories/labs.repositories';
import { StudyProgramRepositories } from 'src/database/repositories/study-program.repositories';
import { Seed } from './resource/seed';
import { LabToolRepositories } from 'src/database/repositories/lab-tools.repositories';

@Injectable()
export class SeedService {
    constructor(
        private studyProgramsRepository: StudyProgramRepositories,
        private labRepository: LabsRepositories,
        private labToolsRepository: LabToolRepositories
    ) {}
    
    public async seedStudyPrograms() {
        await this.studyProgramsRepository.createBatch(Seed.studyProgramsData());
    }

    public async seedLabs() {
        await this.labRepository.createBatch(Seed.labsData());
    }

    public async seedLabTools() {
        await this.labToolsRepository.createBatch(Seed.labToolsData());
    }
}
