import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDTO } from './dto/request';
import { SuccessResponse } from 'src/commons/response/SuccessResponse';
import { ApiResponse } from 'src/commons/response/ApiResponse';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() payload: RegisterRequestDTO): Promise<ApiResponse> {
        await this.authService.register(payload);
        return SuccessResponse.success('User has been registered');
    }

    @Post('login')
    login() {
        return 'this.authService.findAll()';
    }
}
