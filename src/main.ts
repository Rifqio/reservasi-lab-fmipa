import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
    AuthExceptionFilter,
    BadRequestExceptionFilter,
    ForbiddenExceptionFilter,
    GlobalExceptionFilter,
    JsonWebTokenErrorFilter,
    NotFoundExceptionFilter,
} from './server/filter/global-exception.filter';
import { Config } from './config/config';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ credentials: true, origin: true, methods: 'GET,HEAD,PATCH,POST,DELETE,OPTIONS' });
    app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true, whitelist: true, transform: true }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalFilters(
        new GlobalExceptionFilter(),
        new AuthExceptionFilter(),
        new JsonWebTokenErrorFilter(),
        new NotFoundExceptionFilter(),
        new BadRequestExceptionFilter(),
        new ForbiddenExceptionFilter(),
    );
    await app.listen(Config.APP_PORT);
}
bootstrap();
