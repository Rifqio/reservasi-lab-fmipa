import { Injectable } from '@nestjs/common';
import { Labs } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service.';
import { Repository } from './repositories.interface';

@Injectable()
export class LabsRepositories implements Repository<Labs, number> {
    constructor(private readonly db: DatabaseService) {}

    public async findById(id: number): Promise<Labs> {
        return await this.db.labs.findFirst({
            where: {
                id_labs: id,
            }
        })
    }

    public async create(data: { name: string; }): Promise<Labs> {
        return await this.db.labs.create({
            data: {
                name: data.name,
            }
        })
    }

    public async update(id: number, data: Partial<Labs>): Promise<Labs> {
        return await this.db.labs.update({
            where: {
                id_labs: id,
            },
            data: {
                ...data,
            }
        })
    }

    public async delete(id: number): Promise<void> {
        await this.db.labs.delete({
            where: {
                id_labs: id,
            }
        })
    }

    public async findAll(): Promise<Array<Labs>> {
        return await this.db.labs.findMany();
    }

    public async createBatch(data: Array<string>) {
        return await this.db.$transaction(
            data.map((lab) => {
                return this.db.labs.create({
                    data: {
                        name: lab,
                    },
                });
            }),
        );
    }
}
