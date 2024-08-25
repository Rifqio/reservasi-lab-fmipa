import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { IsPasswordMatch, IsValidUNSEmail } from 'src/commons/decorators';

export class RegisterRequestDTO {
    @IsEmail()
    @IsNotEmpty()
    @IsValidUNSEmail()
    email: string;

    @IsNotEmpty()
    @Expose({ name: 'full_name' })
    fullName: string;

    @IsNotEmpty()
    @Length(8, 100)
    password: string;

    @IsNotEmpty()
    @Length(8, 100)
    @IsPasswordMatch('password', { message: 'Password and confirm password do not match' })
    @Expose({ name: 'confirm_password' })
    confirmPassword: string;
}
