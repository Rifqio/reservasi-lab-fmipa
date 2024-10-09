import { Injectable, Logger } from '@nestjs/common';
import { LabClearance } from '@prisma/client';
import { isEmpty } from 'lodash';
import { LecturerRepositories } from 'src/database/repositories';
import { LabClearanceRepositories } from 'src/database/repositories/lab-clearance.repositories';
import { LabReservationRepositories } from 'src/database/repositories/lab-reservation.repositories';
import { BusinessException } from 'src/server/exception/business.exception';
import { ApiRequest } from 'src/server/request/api.request';
import { UserRole } from '../auth/dto/user-role.enum';
import { LabClearanceStatus } from './dto/lab-clearance-status.enum';
import { LabClearanceRequest, LabReservationRequest, LabVerifyRequest } from './dto/request';
import { CurrentLabReservationResponse } from './dto/response';

@Injectable()
export class LabService {
    constructor(
        private labReservationRepository: LabReservationRepositories,
        private labClearanceRepository: LabClearanceRepositories,
        private lecturerRepository: LecturerRepositories,
    ) {}
    private logger = new Logger(LabService.name);

    public async reserveLab(payload: LabReservationRequest, nim: string): Promise<string> {
        await this.validateReservation(payload.labId, payload.startDate, payload.endDate);
        const reservation = await this.labReservationRepository.createReservation(payload, nim);
        return reservation.id_reservation;
    }

    public async getCurrentReservation(req: ApiRequest): Promise<Array<CurrentLabReservationResponse>> {
        let reservations: Array<CurrentLabReservationResponse>;
        if (req.user.role === UserRole.STUDENT) {
            reservations = await this.getCurrentReservationByNim(req.user.nim);
        } else {
            reservations = await this.getAllReservations();
        }
        return reservations;
    }

    public async verifyLabReservation(payload: LabVerifyRequest, id: string): Promise<void> {
        await this.findByIdReservation(id);
        await this.labReservationRepository.updateStatusReservation(id, payload.status);
    }

    public async verifyLabClearance(payload: LabVerifyRequest, req: ApiRequest, id: string): Promise<void> {
        const role = req.user.role;
        const status = payload.status;
        
        if (status != 'APPROVED') {
            await this.labClearanceRepository.update(id, { status: LabClearanceStatus.DITOLAK });
            return;
        }

        if (role === UserRole.LECTURER) {
            await this.verifyLabClearanceByLecturer(req.user.nip, id);
        } else {
            await this.verifyLabClearanceByAdmin(id);
        }
    }

    public async requestClearance(payload: LabClearanceRequest, nim: string): Promise<string> {
        const clearance = await this.labClearanceRepository.create({
            nim,
            purpose: payload.purpose,
        });
        return clearance.letter_number;
    }

    private async verifyLabClearanceByAdmin(id: string): Promise<void> {
        await this.labClearanceRepository.update(id, { status: LabClearanceStatus.TERVERIFIKASI_PETUGAS });
    }

    private async verifyLabClearanceByLecturer(nip: string, id: string): Promise<void> {
        const isHeadOfLab = await this.isHeadOfLab(nip);
        const updatedStatus = this.getUpdatedClearanceStatus(isHeadOfLab);
        await this.labClearanceRepository.update(id, { status: updatedStatus });
    }

    private getUpdatedClearanceStatus(isHeadOfLab: boolean): LabClearanceStatus {
        if (isHeadOfLab) {
            return LabClearanceStatus.TERVERIFIKASI_KEPALA_LAB;
        }
        return LabClearanceStatus.TERVERIFIKASI_DOSEN;
    }

    private async isHeadOfLab(nip: string): Promise<boolean> {
        const lab = await this.lecturerRepository.findHeadOfLabByNip(nip);
        return !isEmpty(lab);
    }

    public async getRequestClearance(req: ApiRequest): Promise<Array<LabClearance>> {
        const clearance = await this.labClearanceRepository.findByNim(req.user.nim);
        return clearance;
    }

    protected async findByIdReservation(id: string): Promise<void> {
        const reservation = await this.labReservationRepository.findById(id);
        if (isEmpty(reservation)) {
            this.logger.error(`Lab reservation with id ${id} not found`);
            throw BusinessException.labReservationNotFound();
        }
    }

    private async getCurrentReservationByNim(nim: string): Promise<Array<CurrentLabReservationResponse>> {
        const data = await this.labReservationRepository.getCurrentReservationByNim(nim);
        return data.map(
            (item) =>
                new CurrentLabReservationResponse({
                    reservation_id: item.id_reservation,
                    letter_number: item.letter_number,
                    reservation_purpose: item.reservation_purpose,
                    research_tile: item.research_title,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    status: item.status,
                    source_of_funding: item.source_of_funding,
                }),
        );
    }

    private async getAllReservations(): Promise<Array<CurrentLabReservationResponse>> {
        const data = await this.labReservationRepository.findAll();
        return data.map(
            (item) =>
                new CurrentLabReservationResponse({
                    reservation_id: item.id_reservation,
                    letter_number: item.letter_number,
                    reservation_purpose: item.reservation_purpose,
                    research_tile: item.research_title,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    status: item.status,
                    source_of_funding: item.source_of_funding,
                }),
        );
    }

    private async validateReservation(labId: number, startDate: Date, endDate: Date): Promise<void> {
        if (startDate > endDate) {
            this.logger.error(`Start date ${startDate} is greater than end date ${endDate}`);
            throw BusinessException.invalidLabReservationDate();
        }
        const reservations = await this.labReservationRepository.findReservationByLabIdAndDate(labId, startDate, endDate);
        if (reservations.length > 0) {
            throw BusinessException.labAlreadyReserved();
        }
    }
}
