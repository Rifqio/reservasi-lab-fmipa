import { Injectable } from '@nestjs/common';
import { Lecturers } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service.';

@Injectable()
export class LecturerRepositories {
    constructor(private db: DatabaseService) {}

    public async findLecturerByEmail(email: string): Promise<Lecturers> {
        return await this.db.lecturers.findFirst({
            where: {
                user_email: email,
            },
    });
    }

    // prettier-ignore
    public async findLecturerByEmailWithDetails(email: string): Promise<Lecturers> {
        return await this.db.lecturers.findFirst({
            where: {
                user_email: email,
            },
            select: {
                nip: true,
                user_email: true,
                User: {
                    select: {
                        full_name: true,
                    }
                }
            },
        });
    }

    // prettier-ignore
    public async updateNipByEmail(nip: string, email: string): Promise<Lecturers> {
        return await this.db.lecturers.update({
            where: {
                user_email: email,
            },
            data: {
                nip: nip,
            },
        });
    }
}
