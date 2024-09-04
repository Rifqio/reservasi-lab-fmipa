import { ReservationPurpose, SourceOfFunding } from "@prisma/client";
import { Expose, Transform } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class LabReservationRequest {
    @IsNotEmpty()
    @Expose({ name: 'lab_id' })
    public labId: number;
    
    @IsNotEmpty()
    @Expose({ name: 'lab_tools_name' })
    public labToolsName: Array<string>;
    
    @IsNotEmpty()
    @Expose({ name: 'research_title' })
    public researchTitle: string;

    @IsNotEmpty()
    @IsEnum(SourceOfFunding)
    @Expose({ name: 'source_of_funding' })
    public sourceOfFunding: SourceOfFunding;

    @IsNotEmpty()
    @IsEnum(ReservationPurpose)
    @Expose({ name: 'reservation_purpose' })
    public reservationPurpose: ReservationPurpose;

    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    @Expose({ name: 'start_date' })
    public startDate: Date;
    
    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    @Expose({ name: 'end_date' })
    public endDate: Date;
}