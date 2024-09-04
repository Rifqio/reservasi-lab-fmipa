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
                lab_id: data.labId,
                id_reservation: Utils.generateUUID(),
                nim: nim,
                lab_tools_name: data.labToolsName.join(','),
                letter_number: Utils.generateLetterNumber(),
                research_title: data.researchTitle,
                reservation_purpose: data.reservationPurpose,
                approval_letter_url: '',
                start_date: data.startDate,
                end_date: data.endDate,
                source_of_funding: data.sourceOfFunding,
                status: Status.PENDING,
            },
            select: {
                id_reservation: true,
            }
        });
    }

    // prettier-ignore
    public async findReservationByLabIdAndDate(labId: number, startDate: Date, endDate: Date) {
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

    public async findById(id: string) {
        return await this.db.labReservations.findUnique({
            where: {
                id_reservation: id,
            },
        });
    }

    public async updateStatusReservation(id: string, status: Status) {
        return await this.db.labReservations.update({
            where: {
                id_reservation: id,
            },
            data: {
                status: status,
            },
        });
    }
}
