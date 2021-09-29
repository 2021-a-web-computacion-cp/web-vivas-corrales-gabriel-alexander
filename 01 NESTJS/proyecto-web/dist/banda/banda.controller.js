"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BandaController = void 0;
const common_1 = require("@nestjs/common");
const banda_service_1 = require("./banda.service");
const banda_crear_dto_1 = require("./dto/banda-crear.dto");
const class_validator_1 = require("class-validator");
const bandaConsultarMuchos_dto_1 = require("./dto/bandaConsultarMuchos.dto");
let BandaController = class BandaController {
    constructor(bandaService) {
        this.bandaService = bandaService;
    }
    async listarBndas(response, parametrosConsulta) {
        const bandaConsultarDto = new bandaConsultarMuchos_dto_1.BandaConsultarMuchosDto();
        bandaConsultarDto.skip = parametrosConsulta.skip;
        bandaConsultarDto.take = parametrosConsulta.take;
        bandaConsultarDto.busqueda = parametrosConsulta.busqueda;
        try {
            const errores = await (0, class_validator_1.validate)(bandaConsultarDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien paramentros');
            }
            else {
                const respuesta = await this.bandaService.buscarMuchos(bandaConsultarDto);
                response.render('banda/lista', {
                    datos: { bandas: respuesta, mensaje: parametrosConsulta.mensaje },
                });
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en listar banda' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    vistaCrear(response, parametrosConsulta) {
        response.render('banda/crear', {
            datos: {
                mensaje: parametrosConsulta.mensaje,
            },
        });
    }
    devolverUno(parametrosRuta) {
        return this.bandaService.buscarUno(+parametrosRuta.idBanda);
    }
    async vistaEditar(response, parametrosRuta) {
        try {
            const bandaAEditar = await this.bandaService.buscarUno(+parametrosRuta.idBanda);
            response.render('banda/editar', {
                banda: bandaAEditar,
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Editar');
        }
    }
    async editarBandaFormulario(response, bodyParams) {
        console.log(bodyParams);
        const bandaEditarDto = new banda_crear_dto_1.BandaCrearDto();
        bandaEditarDto.nombre = bodyParams.nombre;
        bandaEditarDto.anio_creacion = +bodyParams.anio;
        if (bodyParams.activa == 'true') {
            bandaEditarDto.activa = true;
        }
        else {
            bandaEditarDto.activa = false;
        }
        bandaEditarDto.num_integrantes = +bodyParams.integrantes;
        bandaEditarDto.genero = bodyParams.genero;
        console.log(bandaEditarDto);
        try {
            const errores = await (0, class_validator_1.validate)(bandaEditarDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien paramentros');
            }
            else {
                await this.bandaService.actualizarUno({
                    id: +bodyParams.bandaId,
                    data: bandaEditarDto,
                });
                response.redirect('/banda/lista-bandas');
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear banda' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    async crearBandaFormulario(response, bodyParams) {
        console.log(bodyParams);
        const bandaCrearDto = new banda_crear_dto_1.BandaCrearDto();
        bandaCrearDto.nombre = bodyParams.nombre;
        bandaCrearDto.anio_creacion = +bodyParams.anio;
        if (bodyParams.activa == 'true') {
            bandaCrearDto.activa = true;
        }
        else {
            bandaCrearDto.activa = false;
        }
        bandaCrearDto.num_integrantes = +bodyParams.integrantes;
        bandaCrearDto.genero = bodyParams.genero;
        try {
            const errores = await (0, class_validator_1.validate)(bandaCrearDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien paramentros');
            }
            else {
                const respuestaUsuario = await this.bandaService.crearUno(bandaCrearDto);
                response.redirect('/banda/vista-crear' +
                    '?mensaje=Se creo la banda ' +
                    bodyParams.nombre);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear banda' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
    async eliminarBanda(response, parametrosRuta) {
        try {
            await this.bandaService.eliminarUno(+parametrosRuta.idBanda);
            response.redirect('/banda/lista-bandas' + '?mensaje= Se eliminó la banda');
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error Eliminar');
        }
    }
    async crearUno(bodyParams) {
        const bandaCrearDto = new banda_crear_dto_1.BandaCrearDto();
        bandaCrearDto.nombre = bodyParams.nombre;
        bandaCrearDto.anio_creacion = bodyParams.anio_creacion;
        bandaCrearDto.activa = bodyParams.activa;
        bandaCrearDto.num_integrantes = bodyParams.num_integrantes;
        bandaCrearDto.genero = bodyParams.genero;
        try {
            const errores = await (0, class_validator_1.validate)(bandaCrearDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien paramentros');
            }
            else {
                return this.bandaService.crearUno(bandaCrearDto);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en crear banda' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
};
__decorate([
    (0, common_1.Get)('lista-bandas'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BandaController.prototype, "listarBndas", null);
__decorate([
    (0, common_1.Get)('vista-crear'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BandaController.prototype, "vistaCrear", null);
__decorate([
    (0, common_1.Get)(':idBanda'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BandaController.prototype, "devolverUno", null);
__decorate([
    (0, common_1.Get)('vista-editar/:idBanda'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BandaController.prototype, "vistaEditar", null);
__decorate([
    (0, common_1.Post)('editar-banda-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BandaController.prototype, "editarBandaFormulario", null);
__decorate([
    (0, common_1.Post)('crear-banda-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BandaController.prototype, "crearBandaFormulario", null);
__decorate([
    (0, common_1.Post)('eliminar-banda/:idBanda'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BandaController.prototype, "eliminarBanda", null);
__decorate([
    (0, common_1.Post)('crear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BandaController.prototype, "crearUno", null);
BandaController = __decorate([
    (0, common_1.Controller)('banda'),
    __metadata("design:paramtypes", [banda_service_1.BandaService])
], BandaController);
exports.BandaController = BandaController;
//# sourceMappingURL=banda.controller.js.map