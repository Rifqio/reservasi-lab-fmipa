import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthException extends HttpException {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }

    public static userAlreadyExists() {
        return new AuthException('User already exists', HttpStatus.UNAUTHORIZED);
    }
}
