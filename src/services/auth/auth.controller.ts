import { Controller, Post, Body, HttpStatus, HttpCode, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDTO, RefreshTokenRequestDTO, RegisterRequestDTO } from './dto';
import { SuccessResponse } from 'src/server/response/success.response';
import { Public } from 'src/commons/decorators/public.decorator';
import { LoginResponse, RegisterResponse } from './dto/response';
import { VerifyRegisterTokenRequestDTO } from './dto/request/verify-register-token.request.dto';
import { Encryption } from 'src/commons/encryption';

@Controller('api/v1/auth')
@Public()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(@Body() payload: RegisterRequestDTO): Promise<SuccessResponse<RegisterResponse>> {
        const userId = await this.authService.register(payload);
        const response = new RegisterResponse(userId);
        return SuccessResponse.successWithData('User has been registered', response);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    public async login(@Body() payload: LoginRequestDTO): Promise<SuccessResponse<LoginResponse>> {
        const token = await this.authService.login(payload);
        return SuccessResponse.successWithData('User has been logged in', token);
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    public async refreshToken(@Body() payload: RefreshTokenRequestDTO): Promise<SuccessResponse<LoginResponse>> {
        const token = await this.authService.refreshToken(payload.refreshToken);
        return SuccessResponse.successWithData('Token has been refreshed', token);
    }

    @Get('verify')
    public async verify(@Query('token') payload: string): Promise<SuccessResponse<void>> {
        console.log(payload);
        await this.authService.verifyRegisterToken(payload);
        return SuccessResponse.success('User has been verified');
    }
}
