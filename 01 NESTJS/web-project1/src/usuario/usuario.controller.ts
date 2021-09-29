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
  Query,
  Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Prisma } from '@prisma/client';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import internal from 'stream';
import { validate } from 'class-validator';
import { takeWhile } from 'rxjs';
@Controller('usuario')
export class UsuarioController {
  constructor(
    //inyeccion dependencias)
    private usuarioService: UsuarioService,
  ) {}

  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }

  @Get('lista-usuarios')
  async listaUsuarios(@Res() response, @Query() parametrosConsulta) {
    try {
      //Validar parametros de consulta con un DTO (TODO)
      const respuesta = await this.usuarioService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      console.log(respuesta);
      response.render('usuario/lista', {
        datos: {
          usuarios: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }

  @Get(':idUsuario')
  obtenerUno(@Param() params) {
    return this.usuarioService.buscarUno(+params.idUsuario);
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() parametrosConsulta) {
    response.render('usuario/crear', {
      datos: {
        mensaje: parametrosConsulta.mensaje,
      },
    });
  }

  @Post('crear-usuario-formulario')
  async crearUsuarioFormulario(@Res() response, @Body() parametrosCuerpo) {
    try {
      const respuestaUsuario = await this.usuarioService.crearUno({
        nombre: parametrosCuerpo.nombre,
        apellido: parametrosCuerpo.apellido,
      });
      response.redirect(
        '/usuario/vista-crear' +
          '?mensaje=Se creo el usuario ' +
          parametrosCuerpo.nombre,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creando usuario');
    }
  }

  @Post('eliminar-usuario/:idUsuario')
  async eliminarUsuario(@Res() response, @Param() parametrosRuta) {
    try {
      await this.usuarioService.eliminarUno(+parametrosRuta.idUsuario);
      response.redirect(
        '/usuario/lista-usuarios' + '?mensaje= Se eliminó al usuario',
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error');
    }
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
