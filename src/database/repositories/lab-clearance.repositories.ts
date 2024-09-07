import { Injectable } from '@nestjs/common';
import { $Enums, LabClearance } from '@prisma/client';
import { Utils } from 'src/commons/utils';
import { LabClearanceStatus } from 'src/services/lab/dto/lab-clearance-status.enum';
import { DatabaseService } from '../database.service.';
import { Repository } from './repositories.interface';

type LabClearanceInput = { 
    id_clearance?: string; 
    nim: string; 
    letter_number?: string; 
    purpose: $Enums.LabClearancePurpose; 
    status?: string; 
    created_at?: Date; 
    updated_at?: Date; 
};

@Injectable()
export class LabClearanceRepositories implements Repository<LabClearance, string> {
    constructor(private readonly db: DatabaseService) {}

    public async findById(id: string): Promise<LabClearance> {
        return await this.db.labClearance.findFirst({
            where: {
                id_clearance: id,
            },
        });
    }

    public async findByNim(nim: string): Promise<Array<LabClearance>> {
        return await this.db.labClearance.findMany({
            where: {
                nim,
            },
        });
    }

    public async findAll(): Promise<Array<LabClearance>> {
        return await this.db.labClearance.findMany();
    }

    public async create(data: LabClearanceInput) {
        data.id_clearance = Utils.generateUUID();
        data.status = LabClearanceStatus.BELUM_AKTIF;
        data.letter_number = Utils.generateLetterNumber();
        data.created_at = new Date();
        data.updated_at = new Date();

        return await this.db.labClearance.create({
            data: {
                id_clearance: data.id_clearance,
                nim: data.nim,
                letter_number: data.letter_number,
                purpose: data.purpose,
                status: data.status,
                created_at: data.created_at,
                updated_at: data.updated_at,
            },
        });
    }

    public async update(id: string, data: Partial<LabClearanceInput>): Promise<LabClearance> {
        return await this.db.labClearance.update({
            where: {
                id_clearance: id,
            },
            data: {
                ...data,
                updated_at: new Date(),
            },
        });
    }

    public async delete(id: string): Promise<void> {
        await this.db.labClearance.delete({
            where: {
                id_clearance: id,
            },
        })
    }
}
