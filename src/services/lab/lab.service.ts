import { Injectable, Logger } from '@nestjs/common';
import { LabReservationRepositories } from 'src/database/repositories/lab-reservation.repositories';
import { LabReservationRequest } from './dto/request';
import { BusinessException } from 'src/server/exception/business.exception';
import { ApiRequest } from 'src/server/request/api.request';
import { UserRole } from '../auth/dto/user-role.enum';
import { CurrentLabReservationResponse } from './dto/response';

@Injectable()
export class LabService {
    constructor(private labReservationRepository: LabReservationRepositories) {}
    private logger = new Logger(LabService.name);

    // prettier-ignore
    public async reserveLab(payload: LabReservationRequest, nim: string) : Promise<string> {
        this.validateReservation(payload.lab_id, payload.start_date, payload.end_date);
        const reservation = await this.labReservationRepository.createReservation(payload, nim);
        return reservation.id_reservation;
    }

    public async getCurrentReservation(req: ApiRequest) : Promise<Array<CurrentLabReservationResponse>> {
        let reservations: Array<CurrentLabReservationResponse>;
        if (req.user.role === UserRole.STUDENT) {
            reservations = await this.getCurrentReservationByNim(req.user.nim);
        } else {
            reservations = await this.getAllReservations();
        }
        return reservations;
    }

    // prettier-ignore
    private async getCurrentReservationByNim(nim: string) : Promise<Array<CurrentLabReservationResponse>> {
        const data = await this.labReservationRepository.getCurrentReservationByNim(nim);
        return data.map((item) => new CurrentLabReservationResponse({
            reservation_id: item.id_reservation,
            letter_number: item.letter_number,
            reservation_purpose: item.reservation_purpose,
            research_tile: item.research_title,
            start_date: item.start_date,
            end_date: item.end_date,
            status: item.status,
            source_of_funding: item.source_of_funding,
        }));    
    }

    // prettier-ignore
    private async getAllReservations() : Promise<Array<CurrentLabReservationResponse>> {
        const data = await this.labReservationRepository.findAll();
        return data.map((item) => new CurrentLabReservationResponse({
            reservation_id: item.id_reservation,
            letter_number: item.letter_number,
            reservation_purpose: item.reservation_purpose,
            research_tile: item.research_title,
            start_date: item.start_date,
            end_date: item.end_date,
            status: item.status,
            source_of_funding: item.source_of_funding,
        }));
    }

    // prettier-ignore
    private async validateReservation(labId: string, startDate: Date, endDate: Date) : Promise<void> {
        const reservations = await this.labReservationRepository.findReservationByLabIdAndDate(labId, startDate, endDate);
        if (reservations.length > 0) {
            this.logger.error(`Lab id ${labId} already reserved for the date ${startDate} - ${endDate}`);
            throw BusinessException.labAlreadyReserved();
        } 
    }
}
