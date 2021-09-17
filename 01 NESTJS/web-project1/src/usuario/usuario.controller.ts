import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Prisma } from '@prisma/client';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import internal from 'stream';
import { validate } from 'class-validator';
@Controller('usuario')
export class UsuarioController {
  constructor(
    //inyeccion dependencias)
    private usuarioService: UsuarioService,
  ) {}

  @Get('lista-usuarios')
  listaUsuarios(@Res() response) {
    response.render('inicio');
  }

  @Get(':idUsuario')
  obtenerUno(@Param() params) {
    return this.usuarioService.buscarUno(+params.idUsuario);
  }

  @Post('crear')
  async crearUno(@Body() bodyParams) {
    const usuarioCrearDto = new UsuarioCrearDto();
    usuarioCrearDto.nombre = bodyParams.nombre;
    usuarioCrearDto.apellido = bodyParams.apellido;
    usuarioCrearDto.fechaCreacion = bodyParams.fechaCreacion;
    try {
      const errores = await validate(usuarioCrearDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien paramentros');
      } else {
        return this.usuarioService.crearUno(usuarioCrearDto);
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear usuario' });
      throw new InternalServerErrorException('Error servidor');
    }
  }

  @Put(':idUsuario')
  actualizarUno(@Param() params, @Body() bodyParams) {
    return this.usuarioService.actualizarUno({
      data: {
        nombre: bodyParams.nombre,
        apellido: bodyParams.apellido,
        fechaCreacion: new Date(),
      },
      id: +params.idUsuario,
    });
  }

  @Delete(':idUsuario')
  eliminarUno(@Param() params) {
    return this.usuarioService.eliminarUno(+params.idUsuario);
  }
}
