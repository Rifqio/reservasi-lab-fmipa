import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { Config } from 'src/config/config';
import { AuthException } from 'src/server/exception/auth.exception';
import { TokenPayload } from '../../services/auth/dto/token-payload';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/commons/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}
    private logger = new Logger(AuthGuard.name);

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw AuthException.unauthorized();
        }

        try {
            const payload: TokenPayload = await this.jwtService.verifyAsync(token, {
                secret: Config.JWT_SECRET,
                issuer: Config.JWT_ISSUER,
            });
            request['user'] = payload;
        } catch (error) {
            if (error instanceof TokenExpiredError) throw AuthException.tokenExpired();
            this.logger.error(error);
            throw AuthException.unauthorized();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
