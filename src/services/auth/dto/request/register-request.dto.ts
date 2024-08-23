import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { UserRole } from '../user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotAdmin } from 'src/commons/decorators/is-not-admin.decorator';

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
    @IsNotAdmin({ message: 'Invalid role' })
    @IsEnum(UserRole, { message: 'Invalid role' })
    @ApiProperty({ enum: UserRole })
    role: UserRole;
}
