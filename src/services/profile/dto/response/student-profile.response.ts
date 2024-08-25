import { Expose } from "class-transformer";

interface IStudentProfile {
    nim: string;
    userEmail: string;
    fullName: string;
    phoneNumber: string;
    batch: number;
    studyProgram: string;
}

export class StudentProfile {
    constructor(data: IStudentProfile) {
        this.nim = data.nim;
        this.userEmail = data.userEmail;
        this.fullName = data.fullName;
        this.phoneNumber = data.phoneNumber;
        this.batch = data.batch;
        this.studyProgram = data.studyProgram;
    }

    public nim: string;

    @Expose({ name: 'user_email' })
    public userEmail: string;


    @Expose({ name: 'full_name' })
    public fullName: string;
    
    @Expose({ name: 'phone_number' })
    public phoneNumber: string;
    
    public batch: number;
    
    @Expose({ name: 'study_program' })
    public studyProgram: string;
}