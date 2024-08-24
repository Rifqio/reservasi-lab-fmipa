import { IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshTokenRequestDTO {
    @IsNotEmpty()
    @IsJWT({ message: 'Invalid refresh token' })
    refresh_token: string;
}
