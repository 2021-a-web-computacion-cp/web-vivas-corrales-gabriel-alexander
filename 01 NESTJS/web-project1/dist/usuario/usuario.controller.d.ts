import { UsuarioService } from './usuario.service';
import { Prisma } from '@prisma/client';
export declare class UsuarioController {
    private usuarioService;
    constructor(usuarioService: UsuarioService);
    inicio(response: any): void;
    listaUsuarios(response: any, parametrosConsulta: any): Promise<void>;
    obtenerUno(params: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    vistaCrear(response: any, parametrosConsulta: any): void;
    crearUsuarioFormulario(response: any, parametrosCuerpo: any): Promise<void>;
    eliminarUsuario(response: any, parametrosRuta: any): Promise<void>;
    crearUno(bodyParams: any): Promise<import(".prisma/client").EPN_USUARIO>;
    actualizarUno(params: any, bodyParams: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
    eliminarUno(params: any): Prisma.Prisma__EPN_USUARIOClient<import(".prisma/client").EPN_USUARIO>;
}
