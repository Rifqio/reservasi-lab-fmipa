import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthException } from 'src/commons/exception/AuthException';
import { ErrorResponse } from 'src/commons/response/ErrorResponse';

@Catch(AuthException)
export class AuthExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AuthExceptionFilter.name);
    catch(exception: AuthException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        this.logger.error(`[${request.method}] ${request.url}`, exception);
        response.status(exception.getStatus()).json(new ErrorResponse(exception.message, null));
    }
}

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : 500;

        this.logger.error(`[${request.method}] ${request.url}`, exception);
        response.status(status).json(ErrorResponse.internalServerError());
    }
}

