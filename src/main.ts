import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
    AuthExceptionFilter,
    BadRequestExceptionFilter,
    GlobalExceptionFilter,
} from './filter/global-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({ enableDebugMessages: true, whitelist: true }),
    );
    app.useGlobalFilters(
        new GlobalExceptionFilter(),
        new AuthExceptionFilter(),
        new BadRequestExceptionFilter(),
    );
    await app.listen(3000);
}
bootstrap();
