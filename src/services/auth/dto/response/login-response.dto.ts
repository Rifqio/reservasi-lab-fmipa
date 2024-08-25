import { Expose } from "class-transformer";

export class LoginResponse {
    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken
    }

    @Expose({ name: 'access_token' })
    accessToken: string;

    @Expose({ name: 'refresh_token' })
    refreshToken: string;
}