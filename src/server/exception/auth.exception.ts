import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthException extends HttpException {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }

    public static userAlreadyExists() {
        return new AuthException('User already exists', HttpStatus.UNAUTHORIZED);
    }

    public static unauthorized() {
        return new AuthException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    public static userNotFound() {
        return new AuthException('Invalid email or password', HttpStatus.NOT_FOUND);
    }

    public static invalidPassword() {
        return new AuthException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    public static emailNotVerified() {
        return new AuthException('Please verify your email!', HttpStatus.UNAUTHORIZED);
    }
}
