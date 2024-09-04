import { Status } from '@prisma/client';
import { IsIn, IsNotEmpty } from 'class-validator';

export class LabVerifyRequest {
    @IsNotEmpty()
    @IsIn(['REJECTED', 'APPROVED'], { message: 'Status must be REJECTED or APPROVED' })
    public status: Extract<Status, 'REJECTED' | 'APPROVED'>;
}
