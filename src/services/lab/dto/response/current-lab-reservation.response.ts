import { ReservationPurpose, SourceOfFunding, Status } from '@prisma/client';

interface ICurrentLabReservationResponse {
    reservation_id: string;
    research_tile: string;
    letter_number: string;
    status: Status;
    source_of_funding: SourceOfFunding;
    reservation_purpose: ReservationPurpose;
    start_date: Date;
    end_date: Date;
}

export class CurrentLabReservationResponse {
    constructor(data: ICurrentLabReservationResponse) {
        this.reservation_id = data.reservation_id;
        this.research_tile = data.research_tile;
        this.letter_number = data.letter_number;
        this.status = data.status;
        this.source_of_funding = data.source_of_funding;
        this.reservation_purpose = data.reservation_purpose;
        this.start_date = data.start_date;
        this.end_date = data.end_date
    }

    public reservation_id: string;

    public research_tile: string;

    public letter_number: string;

    public status: Status;

    public source_of_funding: SourceOfFunding;

    public reservation_purpose: ReservationPurpose;

    public start_date: Date;

    public end_date: Date;
}
