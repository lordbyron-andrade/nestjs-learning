import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*Esta sentencia de Global pipes permite que cuando se encuentren decoraciones de validadores puedan ser correctamente implementados, lo que nos ayuda a 
  escribir menos codios en los controladores en este proceso de validación*/
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
