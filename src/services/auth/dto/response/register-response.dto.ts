import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
    @ApiProperty()
    user_id: string;
}
