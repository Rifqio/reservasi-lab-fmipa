import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDTO, RegisterRequestDTO } from './dto/request';
import { SuccessResponse } from 'src/server/response/success.response';
import { Public } from 'src/decorators/public.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { LoginResponse, RegisterResponse } from './dto/response';
import { createLoginApiResponseSchema, createRegisterApiResponseSchema } from 'src/commons/swagger/auth/auth.schema';

@Controller('api/v1/auth')
@Public()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // prettier-ignore
    @ApiResponse(createRegisterApiResponseSchema())
    @Post('register')
    public async register(@Body() payload: RegisterRequestDTO): Promise<SuccessResponse<RegisterResponse>> {
        const userId = await this.authService.register(payload);
        return SuccessResponse.successWithData('User has been registered', { user_id: userId });
    }

    // prettier-ignore
    @ApiResponse(createLoginApiResponseSchema())
    @HttpCode(HttpStatus.OK)
    @Post('login')
    public async login(@Body() payload: LoginRequestDTO): Promise<SuccessResponse<LoginResponse>> {
        const token = await this.authService.login(payload);
        return SuccessResponse.successWithData('User has been logged in', { token });
    }
}
