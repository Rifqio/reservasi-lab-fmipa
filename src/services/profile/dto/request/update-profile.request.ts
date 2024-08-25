import { Expose } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

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

    @Length(4, 4)
    public batch: number;
}

export class UpdateLecturerProfileRequest {
    @IsNotEmpty()
    public nip: string;
}
