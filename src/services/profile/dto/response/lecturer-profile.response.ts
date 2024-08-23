interface ILecturerProfile {
    nip: string;
    user_email: string;
    full_name: string;
}

export class LecturerProfile {
    constructor(data: ILecturerProfile) {
        this.nip = data.nip;
        this.user_email = data.user_email;
        this.full_name = data.full_name;
    }

    public nip: string;
    public user_email: string;
    public full_name: string;
}