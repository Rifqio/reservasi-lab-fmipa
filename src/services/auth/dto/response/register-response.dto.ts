import { Expose } from "class-transformer";

export class RegisterResponse {
    constructor(userId: string) {
        this.userId = userId;
    }

    @Expose({ name: 'user_id' })
    userId: string;
}
