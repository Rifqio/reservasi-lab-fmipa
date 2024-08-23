import { Injectable, Logger } from '@nestjs/common';
import { LabReservationRepositories } from 'src/database/repositories/lab-reservation.repositories';
import { LabReservationRequest } from './dto/request';
import { BusinessException } from 'src/server/exception/business.exception';

@Injectable()
export class LabService {
    constructor(private labReservationRepository: LabReservationRepositories) {}
    private logger = new Logger(LabService.name);

    public async reserveLab(payload: LabReservationRequest, nim: string) : Promise<string> {
        this.validateReservation(payload.lab_id, payload.start_date, payload.end_date);
        const reservation = await this.labReservationRepository.createReservation(payload, nim);
        return reservation.id_reservation;
    }

    private async validateReservation(labId: string, startDate: Date, endDate: Date) : Promise<void> {
        const reservations = await this.labReservationRepository.findReservationByLabIdAndDate(labId, startDate, endDate);
        if (reservations.length > 0) {
            this.logger.error(`Lab id ${labId} already reserved for the date ${startDate} - ${endDate}`);
            throw BusinessException.labAlreadyReserved();
        } 
    }
}
