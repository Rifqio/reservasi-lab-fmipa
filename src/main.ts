import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
    AuthExceptionFilter,
    BadRequestExceptionFilter,
    ForbiddenExceptionFilter,
    GlobalExceptionFilter,
    JsonWebTokenErrorFilter,
} from './filter/global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Reservasi Lab')
        .setDescription('Reservasi Lab Untuk Fakultas MIPA')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(
        new ValidationPipe({ enableDebugMessages: true, whitelist: true }),
    );

    app.useGlobalFilters(
        new GlobalExceptionFilter(),
        new AuthExceptionFilter(),
        new JsonWebTokenErrorFilter(),
        new BadRequestExceptionFilter(),
        new ForbiddenExceptionFilter(),
    );
    await app.listen(3000);
}
bootstrap();
