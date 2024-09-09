import { ApiResponse } from './api.response';

export class SuccessResponse<T> extends ApiResponse {
    data: T;

    constructor(message: string, data: T) {
        super(true, message);
        this.data = data;
    }

    public static success<T>(message: string, data?: T) {
        return new SuccessResponse(message, data);
    }

    public static successWithData<T>(message: string, data: T) {
        return new SuccessResponse(message, data);
    }
}
