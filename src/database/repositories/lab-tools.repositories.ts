import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service.';
import { LabTools } from '@prisma/client';

@Injectable()
export class LabToolRepositories {
    constructor(private readonly db: DatabaseService) {}

    public async createBatch(data: Array<string>) {
        return await this.db.$transaction(
            data.map((labTool) => {
                return this.db.labTools.create({
                    data: {
                        name: labTool,
                    },
                });
            }),
        );
    }

    public async findAll() : Promise<Array<LabTools>> {
        return await this.db.labTools.findMany();
    }
}
