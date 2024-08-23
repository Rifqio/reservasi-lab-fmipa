import { Injectable } from '@nestjs/common';
import { Labs } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service.';

@Injectable()
export class LabsRepositories {
    constructor(private readonly db: DatabaseService) {}
    public async findAll(): Promise<Array<Labs>> {
        return await this.db.labs.findMany({});
    }
}
