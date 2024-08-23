import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDTO, RegisterRequestDTO } from './dto/request';
import { SuccessResponse } from 'src/server/response/success.response';
import { Public } from 'src/decorators/public.decorator';

@Controller('api/v1/auth')
@Public()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(@Body() payload: RegisterRequestDTO): Promise<SuccessResponse<{ user_id: string }>> {
        const userId = await this.authService.register(payload);
        return SuccessResponse.successWithData('User has been registered', { user_id: userId });
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    public async login(@Body() payload: LoginRequestDTO): Promise<SuccessResponse<{ token: string }>> {
        const token = await this.authService.login(payload);
        return SuccessResponse.successWithData('User has been logged in', { token });
    }
}
