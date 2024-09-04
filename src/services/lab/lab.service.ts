import { Injectable, Logger } from '@nestjs/common';
import { LabReservationRepositories } from 'src/database/repositories/lab-reservation.repositories';
import { LabReservationRequest, LabClearanceRequest, LabVerifyRequest } from './dto/request';
import { BusinessException } from 'src/server/exception/business.exception';
import { ApiRequest } from 'src/server/request/api.request';
import { UserRole } from '../auth/dto/user-role.enum';
import { CurrentLabReservationResponse } from './dto/response';
import { LabClearanceRepositories } from 'src/database/repositories/lab-clearance.repositories';
import { isEmpty } from 'lodash';

@Injectable()
export class LabService {
    constructor(
        private labReservationRepository: LabReservationRepositories,
        private labClearanceRepository: LabClearanceRepositories,
    ) {}
    private logger = new Logger(LabService.name);

    public async reserveLab(payload: LabReservationRequest, nim: string): Promise<string> {
        const existingReservation = await this.validateReservation(payload.labId, payload.startDate, payload.endDate);
        if (existingReservation > 0) {
            this.logger.error(`Lab id ${payload.labId} already reserved for the date ${payload.startDate} - ${payload.endDate}`);
            throw BusinessException.labAlreadyReserved();
        }
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

    public async requestClearance(payload: LabClearanceRequest, nim: string): Promise<string> {
        const clearance = await this.labClearanceRepository.requestClearance(payload, nim);
        return clearance.letter_number;
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

    private async validateReservation(labId: number, startDate: Date, endDate: Date): Promise<number> {
        const reservations = await this.labReservationRepository.findReservationByLabIdAndDate(
            labId,
            startDate,
            endDate,
        );
        return reservations.length;
    }
}
