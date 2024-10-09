export class RefreshTokenDTO {
    constructor(public email: string, public expiredAt: Date) {}
}