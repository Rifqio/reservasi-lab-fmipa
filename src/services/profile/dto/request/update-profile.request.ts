import { IsNotEmpty, Length } from "class-validator";

export class UpdateStudentProfileRequest {
    @IsNotEmpty()
    public nim: string;

    @IsNotEmpty()
    @Length(12, 12)
    public phone_number: string;
    
    @IsNotEmpty()
    public study_program: string;
    
    @Length(4, 4)
    public batch: number;
}

export class UpdateLecturerProfileRequest {
    @IsNotEmpty()
    public nip: string;
}
