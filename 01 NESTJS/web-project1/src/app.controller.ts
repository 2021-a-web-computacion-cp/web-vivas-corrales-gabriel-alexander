import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Query,
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
    res.cookie('cookieSegura', 'esto esta seguro :)', {
      secure: true, //solo se transfieren por canales confiables https
      signed: true, // Encriptación
    });
    res.send('ok');
  }

  //req.signedCookies.total existe= tonces restamos
  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    return {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
  }

  @Get('parametros-consulta/:nombre/:otroParametro')
  @HttpCode(200)
  @Header('Cache-control', 'none') //Cabeceras de respuesta (response headers)
  @Header('EPN', 'Sistenas') //Cabeceras de respuesta (response headers)
  parametrosConsulta(@Query() queryParams, @Param() params) {
    return {
      parametrosConsilta: queryParams,
      parametrosRuta: params,
    };
  }

  @Post('parametros-Cuerpo') //201 Creado ( Por Defecto)
  @HttpCode(200)
  parametrosCuerpo(@Body() bodyParams, @Headers() cabecerasPeticion) {
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion,
    };
  }
}

//npm i cookie-parser express-session session-file-store
