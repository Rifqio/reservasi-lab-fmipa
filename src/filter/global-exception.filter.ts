import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponseType } from 'src/commons/@types/error/api-error.types';
import { AuthException } from 'src/server/exception/auth.exception';
import { ErrorResponse } from 'src/server/response/error.response';

@Catch(AuthException)
export class AuthExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AuthExceptionFilter.name);
    catch(exception: AuthException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const jsonResponse = new ErrorResponse(exception.message, null);

        this.logger.error(`[${request.method}] ${request.url}`, exception);
        response.status(exception.getStatus()).json(jsonResponse);
    }
}

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(BadRequestExceptionFilter.name);
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // prettier-ignore
        const errorsMessage = (exception.getResponse() as ApiErrorResponseType).message;
        const jsonResponse = new ErrorResponse(
            exception.message,
            errorsMessage,
        );

        this.logger.error(`[${request.method}] ${request.url}`, exception);
        response.status(HttpStatus.BAD_REQUEST).json(jsonResponse);
    }
}

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        // prettier-ignore
        const status = exception instanceof HttpException ? exception.getStatus() : 500;

        this.logger.error(`[${request.method}] ${request.url}`, exception);
        response.status(status).json(ErrorResponse.internalServerError());
    }
}
