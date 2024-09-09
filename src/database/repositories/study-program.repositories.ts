import { Injectable } from '@nestjs/common';
import { StudyPrograms } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service.';
import { Repository } from './repositories.interface';

@Injectable()
export class StudyProgramRepositories implements Repository<StudyPrograms, number> {
    constructor(private db: DatabaseService) {}
    public async findById(id: number): Promise<StudyPrograms> {
        return await this.db.studyPrograms.findFirst({
            where: {
                id_study_program: id,
            },
        });
    }

    public async create(data: { id_study_program?: number; name: string; }): Promise<StudyPrograms> {
        return await this.db.studyPrograms.create({
            data: {
                ...data,
            },
        });
    }

    public async update(id: number, data: Partial<StudyPrograms>): Promise<StudyPrograms> {
        return await this.db.studyPrograms.update({
            where: {
                id_study_program: id,
            },
            data: {
                ...data,
            },
        });
    }

    public async delete(id: number): Promise<void> {
        await this.db.studyPrograms.delete({
            where: {
                id_study_program: id,
            },
        });
    }

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
