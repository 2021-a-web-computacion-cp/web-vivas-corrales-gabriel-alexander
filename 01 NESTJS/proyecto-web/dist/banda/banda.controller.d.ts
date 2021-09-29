import { BandaService } from './banda.service';
export declare class BandaController {
    private bandaService;
    constructor(bandaService: BandaService);
    listarBndas(response: any, parametrosConsulta: any): Promise<void>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    devolverUno(parametrosRuta: any): import(".prisma/client").Prisma.Prisma__BANDA_MUSICALClient<import(".prisma/client").BANDA_MUSICAL>;
    vistaEditar(response: any, parametrosRuta: any): Promise<void>;
    editarBandaFormulario(response: any, bodyParams: any): Promise<void>;
    crearBandaFormulario(response: any, bodyParams: any): Promise<void>;
    eliminarBanda(response: any, parametrosRuta: any): Promise<void>;
    crearUno(bodyParams: any): Promise<import(".prisma/client").BANDA_MUSICAL>;
}
