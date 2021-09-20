import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const express = require('express');
const cookieParser = require('cookie-parser'); //Importar cosas en JS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('publico')); //servidor web estático
  app.use(cookieParser('secret')); //Necesito poner un secreto pa usar cookie segura
  await app.listen(3000);
}
bootstrap();
