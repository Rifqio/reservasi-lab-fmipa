export class RegisterTokenPayload {
    public email: string;
    public expired_at: Date;
    constructor(email: string, expired_at: Date) {
        this.email = email;
        this.expired_at = expired_at;
    }
    // constructor(
    //       public email: string,
    //       public expired_at: Date,
    //   ) {}
}
