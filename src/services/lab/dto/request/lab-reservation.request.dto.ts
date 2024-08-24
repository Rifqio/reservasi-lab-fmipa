import { ReservationPurpose, SourceOfFunding } from "@prisma/client";
import { IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class LabReservationRequest {
    @IsNotEmpty()
    public lab_id: number;
    
    @IsNotEmpty()
    public lab_tools_name: Array<string>;
    
    @IsNotEmpty()
    public research_title: string;

    @IsNotEmpty()
    @IsEnum(SourceOfFunding)
    public source_of_funding: SourceOfFunding;

    @IsNotEmpty()
    @IsEnum(ReservationPurpose)
    public reservation_purpose: ReservationPurpose;

    @IsDate()
    public start_date: Date;
    
    @IsDate()
    public end_date: Date;
}