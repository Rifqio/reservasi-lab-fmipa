import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, Length, Max, Min } from 'class-validator';

export class UpdateStudentProfileRequest {
    @IsNotEmpty()
    public nim: string;

    @IsNotEmpty()
    @Length(12, 12)
    @Expose({ name: 'phone_number' })
    public phoneNumber: string;

    @IsNotEmpty()
    @Expose({ name: 'study_program' })
    public studyProgram: string;

    @IsInt()
    @Min(2010, { message: 'You are not allowed to input batch below 2010' })
    @Max(new Date().getFullYear(), { message: 'You are not allowed to input batch above current year' })
    public batch: number;
}

export class UpdateLecturerProfileRequest {
    @IsNotEmpty()
    public nip: string;
}
