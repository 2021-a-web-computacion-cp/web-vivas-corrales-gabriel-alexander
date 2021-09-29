import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
export declare class BandaService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__BANDA_MUSICALClient<import(".prisma/client").BANDA_MUSICAL>;
    crearUno(banda: Prisma.BANDA_MUSICALCreateInput): Prisma.Prisma__BANDA_MUSICALClient<import(".prisma/client").BANDA_MUSICAL>;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").BANDA_MUSICAL[]>;
    actualizarUno(parametrosActualizar: {
        id: number;
        data: Prisma.BANDA_MUSICALUpdateInput;
    }): Prisma.Prisma__BANDA_MUSICALClient<import(".prisma/client").BANDA_MUSICAL>;
    eliminarUno(id: number): Prisma.Prisma__BANDA_MUSICALClient<import(".prisma/client").BANDA_MUSICAL>;
}
