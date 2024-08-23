import { createApiResponseSchema } from '../create-schema';

export function createRegisterApiResponseSchema() {
    return createApiResponseSchema(201, 'User has been registered', {
        type: 'object',
        properties: {
            user_id: { type: 'string', example: '12345' },
        },
    });
}

export function createLoginApiResponseSchema() {
    return createApiResponseSchema(200, 'User has been logged in', {
        type: 'object',
        properties: {
            token: { type: 'string', example: 'token' },
        },
    });
}
