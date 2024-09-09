import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/commons/decorators/public.decorator';
import { Encryption } from 'src/commons/encryption';
import { Config } from 'src/config/config';
import { AuthException } from 'src/server/exception/auth.exception';
import { UserRole } from 'src/services/auth/dto';
import { TokenPayload } from '../../services/auth/dto/token-payload';

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
            const decryptedToken = Encryption.decrypt(token);
            const payload: TokenPayload = await this.jwtService.verifyAsync(decryptedToken, {
                secret: Config.JWT_SECRET,
                issuer: Config.JWT_ISSUER,
            });

            const profileUrl = request.originalUrl.startsWith('/api/v1/profile');
            const listUrl = request.originalUrl.startsWith('/api/v1/list');
            if (!profileUrl && !listUrl) {
                const isUserStudent = payload.role === UserRole.STUDENT;
                const isUserLecturer = payload.role === UserRole.LECTURER;
                if (isUserStudent || isUserLecturer) {
                    this.isProfileUnset(payload);
                }
            }
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

    private isProfileUnset(user: TokenPayload) {
        let profileField: string;
        if (user.role === UserRole.STUDENT) {
            profileField = user.nim;
        } else {
            profileField = user.nip;
        }

        if (profileField.includes('UNSET')) {
            throw AuthException.userProfileNotSet();
        }

        return user.role === UserRole.STUDENT || user.role === UserRole.LECTURER;
    }
}
