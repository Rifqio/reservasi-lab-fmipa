import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthException extends HttpException {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }

    public static userAlreadyExists(): AuthException {
        return new AuthException('User already exists', HttpStatus.UNAUTHORIZED);
    }

    public static unauthorized(): AuthException {
        return new AuthException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    public static userNotFound(): AuthException {
        return new AuthException('Invalid email or password', HttpStatus.NOT_FOUND);
    }

    public static invalidPassword(): AuthException {
        return new AuthException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    public static invalidToken(): AuthException {
        return new AuthException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    public static emailNotVerified(): AuthException {
        return new AuthException('Please verify your email!', HttpStatus.UNAUTHORIZED);
    }
}
