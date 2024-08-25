import { Expose } from 'class-transformer';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshTokenRequestDTO {
    @IsNotEmpty()
    @IsJWT({ message: 'Invalid refresh token' })
    @Expose({ name: 'refresh_token' })
    refreshToken: string;
}
