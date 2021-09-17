import {
  Body,
  Controller,
  Get,
  Head,
  Header,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
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

  setearCookie(
    @Res() res, //response - RESPUESTA
    valor,
    mensaje,
  ) {
    res.cookie('total', valor, {
      signed: true, // Encriptación
    });
    res.send(mensaje);
  }

  checkTotal(@Res() res, total, respuesta: number) {
    if (total == undefined) {
      this.setearCookie(res, 100, 'No existe Total, se inicia en 100');
    } else {
      const aux: number = Number(total) - respuesta;
      if (aux <= 0) {
        this.setearCookie(
          res,
          100,
          'El juego ha Terminado, reestableciendo total=100',
        );
      } else {
        this.setearCookie(
          res,
          aux,
          'Total Actual: ' +
            total.toString() +
            '\nResultado: ' +
            respuesta.toString() +
            '\nTotal Actualizado: ' +
            aux.toString(),
        );
      }
    }
  }

  @Get('suma')
  @HttpCode(200)
  parametrosConsulta(@Query() queryParams, @Req() req, @Res() res) {
    const total = req.signedCookies.total;
    const respuesta = Number(queryParams['num1']) + Number(queryParams['num2']);
    this.checkTotal(res, total, respuesta);
  }

  @Post('resta') //201 por defecto
  parametrosCuerpo(@Body() bodyParams, @Req() req, @Res() res) {
    const total = req.signedCookies.total;
    const respuesta = Number(bodyParams['num1']) - Number(bodyParams['num2']);
    res.header('respuesta', respuesta);
    this.checkTotal(res, total, respuesta);
  }

  @Put('multiplicacion/:num1/:num2')
  @HttpCode(200)
  parametrosRuta(@Param() params, @Req() req, @Res() res) {
    const total = req.signedCookies.total;
    const respuesta = Number(params['num1']) * Number(params['num2']);
    this.checkTotal(res, total, respuesta);
  }

  @Patch('division')
  @HttpCode(201)
  headersRecibidos(@Headers() headers, @Req() req, @Res() res) {
    const total = req.signedCookies.total;
    const respuesta = Number(headers['num1']) / Number(headers['num2']);
    this.checkTotal(res, total, respuesta);
  }
}
