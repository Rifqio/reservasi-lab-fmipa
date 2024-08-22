import { ApiResponse } from './ApiResponse';

export class SuccessResponse<T> extends ApiResponse {
    private data: T;

    constructor(message: string, data: T) {
        super(true, message);
        this.data = data;
    }

    public static success(message: string) {
        return new SuccessResponse(message, null);
    }
}
