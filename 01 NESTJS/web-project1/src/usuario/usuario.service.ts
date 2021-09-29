import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { contains } from 'class-validator';
@Injectable()
export class UsuarioService {
  constructor(
    //inyectar dependencias)
    private prisma: PrismaService,
  ) {}

  buscarMuchos(parametrosBusqueda: {
    skip?: number; //Registros que te saltas
    take?: number; //Registros que tomas
    busqueda?: string; // Lo que el usuario busca
    // orderBy?: Prisma.EPN_UsuarioOrder;
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
          OR: [
            { nombre: { contains: parametrosBusqueda.busqueda } },
            { apellido: { contains: parametrosBusqueda.busqueda } },
          ],
        }
      : {};
    return this.prisma.ePN_USUARIO.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }

  buscarUno(id: number) {
    return this.prisma.ePN_USUARIO.findUnique({
      where: { id: id },
    });
  }

  crearUno(usuario: Prisma.EPN_USUARIOCreateInput) {
    return this.prisma.ePN_USUARIO.create({ data: usuario });
  }

  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.EPN_USUARIOUpdateInput;
  }) {
    return this.prisma.ePN_USUARIO.update({
      data: parametrosActualizar.data,
      where: { id: parametrosActualizar.id },
    });
  }

  /*
  eliminarUno(where: Prisma.EPN_USUARIOWhereUniqueInput) {
    return this.prisma.ePN_USUARIO.delete({
      where: where,
    });
  }
  */
  eliminarUno(id: number) {
    return this.prisma.ePN_USUARIO.delete({
      where: { id: id },
    });
  }
}
