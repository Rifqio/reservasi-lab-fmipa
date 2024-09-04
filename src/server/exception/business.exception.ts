import { HttpException, HttpStatus } from "@nestjs/common";

export class BusinessException extends HttpException {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }

    public static labAlreadyReserved(): BusinessException {
        throw new BusinessException('Lab has been reserved', HttpStatus.BAD_REQUEST);
    }

    public static labReservationNotFound(): BusinessException {
        throw new BusinessException('Lab reservation not found', HttpStatus.NOT_FOUND);
    }

    public static labNameRequired(): BusinessException {
        throw new BusinessException('Lab Name is required', HttpStatus.BAD_REQUEST);
    }
}