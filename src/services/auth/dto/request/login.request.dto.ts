import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginRequestDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}