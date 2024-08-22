import {
    Injectable,
    Logger,
    OnModuleInit,
    OnModuleDestroy,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    private readonly logger = new Logger(DatabaseService.name);

    /**
     * Forced to use @ts-ignore since it throws weird bug while using $on method
     */
    constructor() {
        super({
            log: [
                { level: 'query', emit: 'event' },
                { level: 'info', emit: 'stdout' },
                { level: 'warn', emit: 'stdout' },
                { level: 'error', emit: 'stdout' },
            ],
        });

        // @ts-ignore
        this.$on('query', (event: Prisma.QueryEvent) => {
            this.logger.debug(
                `Query: ${event.query} Params: ${event.params} Duration: ${event.duration}ms`,
            );
        });

        // @ts-ignore
        this.$on('info', (event: Prisma.LogEvent) => {
            this.logger.log(`Info: ${event.message}`);
        });

        // @ts-ignore
        this.$on('warn', (event: Prisma.LogEvent) => {
            this.logger.warn(`Warn: ${event.message}`);
        });

        // @ts-ignore
        this.$on('error', (event: Prisma.LogEvent) => {
            this.logger.error(`Error: ${event.message}`);
        });
    }

    async onModuleInit() {
        this.logger.log('Connecting to database...');
        await this.$connect();
        this.logger.log('Connected to database');
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
