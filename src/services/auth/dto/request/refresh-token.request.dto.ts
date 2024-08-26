import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenRequestDTO {
    @IsNotEmpty()
    @Expose({ name: 'refresh_token' })
    refreshToken: string;
}
