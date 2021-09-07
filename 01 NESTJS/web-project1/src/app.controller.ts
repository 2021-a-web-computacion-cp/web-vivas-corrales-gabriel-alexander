import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('texto')
  @HttpCode(200)
  getHelloText(): string {
    return 'Hola texto';
  }
  @Get('html')
  @HttpCode(201)
  getHelloHttp(): string {
    return '<h1>Hola html</h1> <button>click</button>';
  }

  @Get('json')
  @HttpCode(200)
  getHelloJSON(): string {
    return '{ mensaje: "hola json"}';
  }

  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }
  @Get('internalError')
  internalError() {
    throw new InternalServerErrorException();
  }

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
    @Req() req, //request - PETICION
    @Res() res, //response - RESPUESTA
  ) {
    //nombre            valor
    res.cookie('cookieInsegura', 'esto esta inseguro oe');
    res.cookie('cookieSegura', 'esto esta seguro :)', { secure: true });
    res.send('ok');
  }
  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    return mensaje;
  }
}

//npm i cookie-parser express-session session-file-store
