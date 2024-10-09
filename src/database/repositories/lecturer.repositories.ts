import { Injectable } from '@nestjs/common';
import { Lecturers } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service.';
import { LecturerProfile } from 'src/services/profile/dto/response/lecturer-profile.response';
import { Repository } from './repositories.interface';

@Injectable()
export class LecturerRepositories implements Repository<Lecturers, string> {
    constructor(private db: DatabaseService) {}

    findById(id: string): Promise<{ user_email: string; nip: string; is_head_of_lab: boolean; }> {
        throw new Error('Method not implemented.');
    }

    public async findAll(): Promise<Array<Lecturers>> {
        return await this.db.lecturers.findMany();
    }
    
    public async create(data: Lecturers): Promise<Lecturers> {
        return await this.db.lecturers.create({
            data: {
                ...data
            }
        })
    }

    public async findHeadOfLabByNip(nip: string): Promise<Lecturers> {
        return await this.db.lecturers.findFirst({
            where: {
                nip: nip,
                is_head_of_lab: true,
            },
        });
    }

    public async update(email: string, data: Partial<Lecturers>): Promise<Lecturers> {
        return await this.db.lecturers.update({
            where: {
                user_email: email,
            },
            data: {
                ...data,
            },
        })
    }

    async delete(email: string): Promise<void> {
        await this.db.lecturers.delete({
            where: {
                user_email: email,
            },
        });
    }

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
