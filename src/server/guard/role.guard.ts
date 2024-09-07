import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/commons/decorators/roles.decorator';
import { TokenPayload } from 'src/services/auth/dto/token-payload';
import { UserRole } from 'src/services/auth/dto/user-role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    // prettier-ignore
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<UserRole[]>(ROLE_KEY, context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const user = request['user'] as TokenPayload;
        return requiredRoles.some(role => user.role.includes(role));
    }
}
