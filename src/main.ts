import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos não definidos no DTO
      forbidNonWhitelisted: true, // Retorna erro para campos não permitidos
      transform: true, // Transforma os dados recebidos para instâncias das classes DTO
    }),
  ); // validação global

  await app.listen(3000);
}
bootstrap();
