import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ApiErrorResponseType } from 'src/commons/@types/error/api-error.types';
import { AuthException } from 'src/server/exception/auth.exception';
import { BusinessException } from 'src/server/exception/business.exception';
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

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(NotFoundExceptionFilter.name);
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const jsonResponse = new ErrorResponse('Requested resource or page not found', null);

        this.logger.error(`[${request.method}] ${request.url}`, exception);
        response.status(HttpStatus.NOT_FOUND).json(jsonResponse);
    }
}

@Catch(JsonWebTokenError)
export class JsonWebTokenErrorFilter implements ExceptionFilter {
    private readonly logger = new Logger(JsonWebTokenErrorFilter.name);
    catch(exception: JsonWebTokenError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const jsonResponse = new ErrorResponse('Invalid token', null);

        this.logger.error(`[${request.method}] ${request.url}`, exception);
        response.status(HttpStatus.UNAUTHORIZED).json(jsonResponse);
    }
}

@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(BusinessExceptionFilter.name);
    catch(exception: BusinessException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const jsonResponse = new ErrorResponse(exception.message, null);

        this.logger.error(`[${request.method}] ${request.url}`, exception);
        response.status(HttpStatus.BAD_REQUEST).json(jsonResponse);
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
        const jsonResponse = new ErrorResponse(exception.message, errorsMessage);

        this.logger.error(`[${request.method}] ${request.url}`, exception);
        response.status(HttpStatus.BAD_REQUEST).json(jsonResponse);
    }
}

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(ForbiddenExceptionFilter.name);
    catch(exception: ForbiddenException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const message = 'You do not have permission to access this resource';

        const jsonResponse = new ErrorResponse(message, null);

        this.logger.error(`[${request.method}] ${request.url}`, exception);
        response.status(HttpStatus.FORBIDDEN).json(jsonResponse);
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
