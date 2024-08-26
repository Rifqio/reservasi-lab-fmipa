import { Injectable } from '@nestjs/common';
import { ListRequestType } from './dto/request';
import { StudyProgramRepositories } from 'src/database/repositories/study-program.repositories';
import { LabsRepositories } from 'src/database/repositories/labs.repositories';
import { ListResponse } from './dto/response';
import { LabToolRepositories } from 'src/database/repositories/lab-tools.repositories';

@Injectable()
export class ListService {
    constructor(
        private studyProgramRepository: StudyProgramRepositories,
        private labRepository: LabsRepositories,
        private labToolsRepository: LabToolRepositories,
    ) {}

    // prettier-ignore
    public async getLists(type: ListRequestType) : Promise<Array<ListResponse>> {
        let data: Array<ListResponse> = null;
        switch (type) {
            case ListRequestType.STUDY_PROGRAM:
                const studyProgram = await this.studyProgramRepository.findAll();
                data = studyProgram.map((item) => new ListResponse(item.id_study_program, item.name));
                break;
            case ListRequestType.LABS:
                const labs = await this.labRepository.findAll();
                data = labs.map((item) => new ListResponse(item.id_labs, item.name));
                break;
            case ListRequestType.LAB_TOOLS:
                const labTools = await this.labToolsRepository.findAll();
                data = labTools.map((item) => new ListResponse(item.id_lab_tools, item.name));
                break;
            default:
                throw new Error('Invalid type');
        }
        
        return data;
    }
}
