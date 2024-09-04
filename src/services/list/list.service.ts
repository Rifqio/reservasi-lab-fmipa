import { Injectable } from '@nestjs/common';
import { camelCase, startCase } from 'lodash';
import { LabToolRepositories } from 'src/database/repositories/lab-tools.repositories';
import { LabsRepositories } from 'src/database/repositories/labs.repositories';
import { StudyProgramRepositories } from 'src/database/repositories/study-program.repositories';
import { ListRequestType } from './dto/request';
import { ListResponse } from './dto/response';

@Injectable()
export class ListService {
    constructor(
        private studyProgramRepository: StudyProgramRepositories,
        private labRepository: LabsRepositories,
        private labToolsRepository: LabToolRepositories,
    ) {}

    // prettier-ignore
    public async getLists(type: ListRequestType, labName: string) : Promise<Array<ListResponse>> {
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
                const transformedLabName = startCase(camelCase(labName));
                const labTools = await this.labToolsRepository.findByLabName(transformedLabName);
                data = labTools.map((item) => new ListResponse(item.id_lab_tools, item.name));
                break;
        }
        
        return data;
    }
}
