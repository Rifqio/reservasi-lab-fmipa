import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './config/config';
import {
    AuthExceptionFilter,
    BadRequestExceptionFilter,
    BusinessExceptionFilter,
    ForbiddenExceptionFilter,
    GlobalExceptionFilter,
    JsonWebTokenErrorFilter,
    NotFoundExceptionFilter,
} from './server/filter/global-exception.filter';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ credentials: true, origin: true, methods: 'GET,HEAD,PATCH,POST,DELETE,OPTIONS' });
    app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true, whitelist: true, transform: true }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.setGlobalPrefix(Config.BASE_PATH || 'api');
    app.useGlobalFilters(
        new GlobalExceptionFilter(),
        new BusinessExceptionFilter(),
        new AuthExceptionFilter(),
        new JsonWebTokenErrorFilter(),
        new NotFoundExceptionFilter(),
        new BadRequestExceptionFilter(),
        new ForbiddenExceptionFilter(),
    );
    await app.listen(Config.APP_PORT);
}
bootstrap();
