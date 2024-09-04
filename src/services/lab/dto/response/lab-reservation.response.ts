import { Expose } from "class-transformer";

export class LabReservationResponse {
    @Expose({ name: 'reservation_id' })
    public reservationId: string;
    
    constructor(reservationId: string) {
        this.reservationId = reservationId;
    }

}