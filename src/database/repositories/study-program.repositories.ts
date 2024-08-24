import { Injectable } from '@nestjs/common';
import { StudyPrograms } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service.';

@Injectable()
export class StudyProgramRepositories {
    constructor(private db: DatabaseService) {}

    public async findAll(): Promise<Array<StudyPrograms>> {
        return await this.db.studyPrograms.findMany({
            select: {
                id_study_program: true,
                name: true,
                _count: true,
            },
        });
    }

    public async createBatch(data: Array<string>) {
        return await this.db.$transaction(
            data.map((name) =>
                this.db.studyPrograms.create({
                    data: {
                        name,
                    },
                }),
            ),
        );
    }
}
