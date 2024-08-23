import { HttpException } from "@nestjs/common";

export class BusinessException extends HttpException {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }

    public static labAlreadyReserved(): BusinessException {
        return new BusinessException('Lab has been reserved', 400);
    }
}