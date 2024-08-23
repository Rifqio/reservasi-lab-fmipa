import { getSchemaPath } from '@nestjs/swagger';

export function createApiResponseSchema(status: number, message: string, dataSchema: any) {
    return {
        status,
        schema: {
            properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: message },
                data: dataSchema,
            },
        },
    };
}
