import { Injectable, Logger, NestMiddleware  } from "@nestjs/common";
import { ApiRequest } from "../request";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(RequestLoggerMiddleware.name);
    use(req: ApiRequest, res: Response, next: NextFunction) {
        if (req.method === 'POST' || req.method === 'PATCH') {
            this.logger.log(`[${req.method}] ${req.originalUrl} ${JSON.stringify(req.body)} | user: ${req?.user}`);
        } else {
            this.logger.log(`[${req.method}] ${req.url} | user: ${req?.user}`);
        }
        next();
    }
}