import { UserRole } from './user-role.enum';

export class TokenPayload {
    sub?: string;
    email: string;
    role: UserRole;
    nim?: string;
    nip?: string;
}
