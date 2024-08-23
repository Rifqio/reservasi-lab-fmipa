interface IStudentProfile {
    nim: string;
    user_email: string;
    full_name: string;
    phone_number: string;
    batch: number;
    study_program: string;
}

export class StudentProfile {
    constructor(data: IStudentProfile) {
        this.nim = data.nim;
        this.user_email = data.user_email;
        this.full_name = data.full_name;
        this.phone_number = data.phone_number;
        this.batch = data.batch;
        this.study_program = data.study_program;
    }

    public nim: string;
    public user_email: string;
    public full_name: string;
    public phone_number: string;
    public batch: number;
    public study_program: string;
}