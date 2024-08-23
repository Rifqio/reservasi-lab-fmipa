import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { UserRole } from '../user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotAdmin, IsPasswordMatch } from 'src/commons/decorators';

export class RegisterRequestDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    full_name: string;

    @IsNotEmpty()
    @Length(8, 100)
    password: string;

    @IsNotEmpty()
    @Length(8, 100)
    @IsPasswordMatch('password', { message: 'Password and confirm password do not match' })
    confirm_password: string;

    @IsNotEmpty()
    @IsNotAdmin({ message: 'Invalid role' })
    @IsEnum(UserRole, { message: 'Invalid role' })
    @ApiProperty({ enum: UserRole })
    role: UserRole;
}
