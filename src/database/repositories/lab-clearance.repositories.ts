import { LabClearanceRequest } from 'src/services/lab/dto/request/lab-clearance.request';
import { DatabaseService } from '../database.service.';
import { Utils } from 'src/commons/utils';
import { LabClearanceStatus } from 'src/services/lab/dto/lab-clearance-status.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LabClearanceRepositories {
    constructor(private readonly db: DatabaseService) {}

    public async requestClearance(data: LabClearanceRequest, nim: string) {
        return await this.db.labClearance.create({
            data: {
                purpose: data.purpose,
                status: LabClearanceStatus.BELUM_AKTIF,
                nim: nim,
                id_clearance: Utils.generateUUID(),
                letter_number: Utils.generateLetterNumber(),
                created_at: new Date(),
                updated_at: new Date(),
            },
        });
    }
}
