// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips unrecognized properties
    forbidNonWhitelisted: true, // throws error if unknown property present
    transform: true // transforms payloads to DTO instances
  }));

  await app.listen(3000);
}
bootstrap();

