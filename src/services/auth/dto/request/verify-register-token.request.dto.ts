import { IsNotEmpty } from 'class-validator';

export class VerifyRegisterTokenRequestDTO {
    @IsNotEmpty()
    token: string;
}
