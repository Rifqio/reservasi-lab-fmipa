import { ApiProperty } from '@nestjs/swagger';
import { ApiResponse } from './api.response';

export class ErrorResponse<T> extends ApiResponse {
    @ApiProperty()
    errors: T;

    constructor(message: string, errors: T) {
        super(false, message);
        this.errors = errors;
    }

    public static internalServerError() {
        return new ErrorResponse('Internal Server Error', null);
    }
}
