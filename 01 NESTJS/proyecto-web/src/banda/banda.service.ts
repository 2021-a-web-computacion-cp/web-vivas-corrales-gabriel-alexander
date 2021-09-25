import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BandaService {
  constructor(private prisma: PrismaService) {}

  buscarUno(id: number) {
    return this.prisma.bANDA_MUSICAL.findUnique({
      where: { id: id },
    });
  }

  crearUno(banda: Prisma.BANDA_MUSICALCreateInput) {
    return this.prisma.bANDA_MUSICAL.create({ data: banda });
  }

  buscarMuchos(parametrosBusqueda: {
    skip?: number; //Registros que te saltas
    take?: number; //Registros que tomas
    busqueda?: string; // Lo que el usuario busca
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
          OR: [
            { nombre: { contains: parametrosBusqueda.busqueda } },
            { genero: { contains: parametrosBusqueda.busqueda } },
          ],
        }
      : {};
    return this.prisma.bANDA_MUSICAL.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }

  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.BANDA_MUSICALUpdateInput;
  }) {
    return this.prisma.bANDA_MUSICAL.update({
      data: parametrosActualizar.data,
      where: { id: parametrosActualizar.id },
    });
  }

  eliminarUno(id: number) {
    return this.prisma.bANDA_MUSICAL.delete({
      where: { id: id },
    });
  }
}
