import { Injectable } from '@nestjs/common';
import { Lecturers } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service.';
import { LecturerProfile } from 'src/services/profile/dto/response/lecturer-profile.response';

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
    public async findLecturerByEmailWithDetails(email: string) : Promise<LecturerProfile> {
        const lecturer = await this.db.lecturers.findFirst({
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

        return new LecturerProfile({
            full_name: lecturer.User.full_name,
            nip: lecturer.nip,
            user_email: lecturer.user_email,
        })
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
