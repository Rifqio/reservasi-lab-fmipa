import { LabReservationRequest } from 'src/services/lab/dto/request';
import { DatabaseService } from '../database.service.';
import { Utils } from 'src/commons/utils';
import { Status } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LabReservationRepositories {
    constructor(private db: DatabaseService) {}

    public async createReservation(data: LabReservationRequest, nim: string) {
        return await this.db.labReservations.create({
            data: {
                lab_id: data.lab_id,
                id_reservation: Utils.generateUUID(),
                nim: nim,
                lab_tools_name: data.lab_tools_name,
                letter_number: Utils.generateLetterNumber(),
                research_title: data.research_title,
                reservation_purpose: data.reservation_purpose,
                approval_letter_url: '',
                start_date: data.start_date,
                end_date: data.end_date,
                source_of_funding: data.source_of_funding,
                status: Status.PENDING,
            },
        });
    }

    // prettier-ignore
    public async findReservationByLabIdAndDate(labId: string, startDate: Date, endDate: Date) {
        return await this.db.labReservations.findMany({
            where: {
                lab_id: labId,
                AND: [
                    {
                        OR: [
                            {
                                start_date: {
                                    lte: startDate,
                                },
                                end_date: {
                                    gte: startDate,
                                },
                            },
                            {
                                start_date: {
                                    lte: endDate,
                                },
                                end_date: {
                                    gte: endDate,
                                },
                            },
                        ],
                    },
                ],
            },
        });
    }

    public async getCurrentReservationByNim(nim: string) {
        return await this.db.labReservations.findMany({
            where: {
                nim: nim,
            },
            select: {
                id_reservation: true,
                research_title: true,
                letter_number: true,
                status: true,
                source_of_funding: true,
                reservation_purpose: true,
                start_date: true,
                end_date: true,
            },
        });
    }

    public async findAll() {
        return await this.db.labReservations.findMany();
    }
}
