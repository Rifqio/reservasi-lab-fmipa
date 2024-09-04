import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/commons/decorators/roles.decorator';
import { TokenPayload } from 'src/services/auth/dto/token-payload';
import { UserRole } from 'src/services/auth/dto/user-role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    private readonly logger = new Logger(RoleGuard.name);
    // prettier-ignore
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<UserRole[]>(ROLE_KEY, context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const user = request['user'] as TokenPayload;
        this.logger.log(`Required roles: ${requiredRoles} | User roles: ${user.role}`);
        return requiredRoles.some(role => user.role.includes(role));
    }
}
