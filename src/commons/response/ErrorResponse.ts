import { ApiResponse } from './ApiResponse';

export class ErrorResponse<T> extends ApiResponse {
    private errors: T;

    constructor(message: string, errors: T) {
        super(false, message);
        this.errors = errors;
    }

    public static internalServerError() {
        return new ErrorResponse('Internal Server Error', null);
    }
}
