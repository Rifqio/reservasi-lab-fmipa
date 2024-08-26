import { Expose } from "class-transformer";
import { UserRole } from "../user-role.enum";

export class LoginResponse {
    constructor(accessToken: string, refreshToken: string, role: UserRole) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken
        this.role = role;
    }

    @Expose({ name: 'access_token' })
    accessToken: string;

    @Expose({ name: 'refresh_token' })
    refreshToken: string;

    role: UserRole;
}