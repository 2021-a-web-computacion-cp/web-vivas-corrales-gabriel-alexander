import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { BandaService } from './banda.service';
import { BandaCrearDto } from './dto/banda-crear.dto';
import { validate } from 'class-validator';
import { BandaConsultarMuchosDto } from './dto/bandaConsultarMuchos.dto';

@Controller('banda')
export class BandaController {
  constructor(private bandaService: BandaService) {}

  @Get('lista-bandas')
  async listarBndas(@Res() response, @Query() parametrosConsulta) {
    //HAGO VALIDACIONES DE SKIP TAKE Y BUSQUEDA
    const bandaConsultarDto = new BandaConsultarMuchosDto();
    bandaConsultarDto.skip = parametrosConsulta.skip;
    bandaConsultarDto.take = parametrosConsulta.take;
    bandaConsultarDto.busqueda = parametrosConsulta.busqueda;
    try {
      const errores = await validate(bandaConsultarDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien paramentros');
      } else {
        const respuesta = await this.bandaService.buscarMuchos(
          bandaConsultarDto,
        );
        response.render('banda/lista', {
          datos: { bandas: respuesta, mensaje: parametrosConsulta.mensaje },
        });
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en listar banda' });
      throw new InternalServerErrorException('Error servidor');
    }
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() parametrosConsulta) {
    response.render('banda/crear', {
      datos: {
        mensaje: parametrosConsulta.mensaje,
      },
    });
  }

  @Get('vista-editar/:idBanda')
  async vistaEditar(@Res() response, @Param() parametrosRuta) {
    try {
      const bandaAEditar = await this.bandaService.buscarUno(
        +parametrosRuta.idBanda,
      );
      response.render('banda/editar', {
        banda: bandaAEditar,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Editar');
    }
  }

  @Post('editar-banda-formulario')
  async editarBandaFormulario(@Res() response, @Body() bodyParams) {
    console.log(bodyParams);
    const bandaEditarDto = new BandaCrearDto();
    bandaEditarDto.nombre = bodyParams.nombre;
    bandaEditarDto.anio_creacion = +bodyParams.anio;
    if (bodyParams.activa == 'true') {
      bandaEditarDto.activa = true;
    } else {
      bandaEditarDto.activa = false;
    }
    bandaEditarDto.num_integrantes = +bodyParams.integrantes;
    bandaEditarDto.genero = bodyParams.genero;
    console.log(bandaEditarDto);
    try {
      const errores = await validate(bandaEditarDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien paramentros');
      } else {
        await this.bandaService.actualizarUno({
          id: +bodyParams.bandaId,
          data: bandaEditarDto,
        });
        response.redirect('/banda/lista-bandas');
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear banda' });
      throw new InternalServerErrorException('Error servidor');
    }
  }

  @Post('crear-banda-formulario')
  async crearBandaFormulario(@Res() response, @Body() bodyParams) {
    console.log(bodyParams);
    const bandaCrearDto = new BandaCrearDto();
    bandaCrearDto.nombre = bodyParams.nombre;
    bandaCrearDto.anio_creacion = +bodyParams.anio;
    if (bodyParams.activa == 'true') {
      bandaCrearDto.activa = true;
    } else {
      bandaCrearDto.activa = false;
    }
    bandaCrearDto.num_integrantes = +bodyParams.integrantes;
    bandaCrearDto.genero = bodyParams.genero;
    try {
      const errores = await validate(bandaCrearDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien paramentros');
      } else {
        const respuestaUsuario = await this.bandaService.crearUno(
          bandaCrearDto,
        );
        response.redirect(
          '/banda/vista-crear' +
            '?mensaje=Se creo la banda ' +
            bodyParams.nombre,
        );
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear banda' });
      throw new InternalServerErrorException('Error servidor');
    }
  }

  @Post('eliminar-banda/:idBanda')
  async eliminarBanda(@Res() response, @Param() parametrosRuta) {
    try {
      await this.bandaService.eliminarUno(+parametrosRuta.idBanda);
      response.redirect(
        '/banda/lista-bandas' + '?mensaje= Se eliminó la banda',
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error Eliminar');
    }
  }

  /*
  @Post('crear')
  async crearUno(@Body() bodyParams) {
    const bandaCrearDto = new BandaCrearDto();
    bandaCrearDto.nombre = bodyParams.nombre;
    bandaCrearDto.anio_creacion = bodyParams.anio_creacion;
    bandaCrearDto.activa = bodyParams.activa;
    bandaCrearDto.num_integrantes = bodyParams.num_integrantes;
    bandaCrearDto.genero = bodyParams.genero;
    try {
      const errores = await validate(bandaCrearDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien paramentros');
      } else {
        return this.bandaService.crearUno(bandaCrearDto);
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear banda' });
      throw new InternalServerErrorException('Error servidor');
    }
  }*/
}
