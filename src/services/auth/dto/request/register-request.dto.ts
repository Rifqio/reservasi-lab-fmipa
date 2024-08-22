import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class RegisterRequestDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(8, 100)
    password: string;

    @IsNotEmpty()
    full_name: string;

    @IsNotEmpty()
    role: UserRole;
}
