import { ApiResponse } from './api.response';

export class SuccessResponse<T> extends ApiResponse {
    private data: T;

    constructor(message: string, data: T) {
        super(true, message);
        this.data = data;
    }

    public static success(message: string) {
        return new SuccessResponse(message, null);
    }

    public static successWithData<T>(message: string, data: T) {
        return new SuccessResponse(message, data);
    }
}
