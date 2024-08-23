import { HttpException } from "@nestjs/common";

export class BusinessException extends HttpException {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }
}