
export class TokenDTO {
    constructor(accessToken: string, refreshToken: string) {
        this.access_token = accessToken;
        this.refresh_token = refreshToken
    }
    access_token: string;
    refresh_token: string;
}