import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service.';
import { LabTools } from '@prisma/client';
import { LabToolsType } from 'src/commons/@types/lab-tools';

@Injectable()
export class LabToolRepositories {
    constructor(private readonly db: DatabaseService) {}

    public async createBatch(data: Array<LabToolsType>) {
        const transactions = data.map((entry) => 
            this.db.labTools.create({
                data: {
                    name: entry.name,
                    lab_name: entry.lab_name,
                },
            })
        );

        return await this.db.$transaction(transactions);
    }

    public async findAll(): Promise<Array<LabTools>> {
        return await this.db.labTools.findMany();
    }

    public async findByLabName(labName: string) {
        return await this.db.labTools.findMany({
            where: {
                lab_name: {
                    contains: labName,
                }
            }
        })
    }
}
