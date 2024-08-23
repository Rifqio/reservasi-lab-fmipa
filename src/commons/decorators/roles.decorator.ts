import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/services/auth/dto/user-role.enum";

export const ROLE_KEY = 'role';
export const Roles = (...role: UserRole[]) => SetMetadata(ROLE_KEY, role);