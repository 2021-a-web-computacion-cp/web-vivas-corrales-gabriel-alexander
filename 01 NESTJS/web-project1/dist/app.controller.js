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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getHelloText() {
        return 'Hola texto';
    }
    getHelloHttp() {
        return '<h1>Hola html</h1> <button>click</button>';
    }
    getHelloJSON() {
        return '{ mensaje: "hola json"}';
    }
    badRequest() {
        throw new common_1.BadRequestException();
    }
    internalError() {
        throw new common_1.InternalServerErrorException();
    }
    setearCookieInsegura(req, res) {
        res.cookie('cookieInsegura', 'esto esta inseguro oe');
        res.cookie('cookieSegura', 'esto esta seguro :)', {
            secure: true,
            signed: true,
        });
        res.send('ok');
    }
    mostrarCookies(req) {
        return {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
    }
    parametrosConsulta(queryParams, params) {
        return {
            parametrosConsilta: queryParams,
            parametrosRuta: params,
        };
    }
    parametrosCuerpo(bodyParams, cabecerasPeticion) {
        return {
            parametrosCuerpo: bodyParams,
            cabeceras: cabecerasPeticion,
        };
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('texto'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHelloText", null);
__decorate([
    common_1.Get('html'),
    common_1.HttpCode(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHelloHttp", null);
__decorate([
    common_1.Get('json'),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHelloJSON", null);
__decorate([
    common_1.Get('bad-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "badRequest", null);
__decorate([
    common_1.Get('internalError'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "internalError", null);
__decorate([
    common_1.Get('setear-cookie-insegura'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setearCookieInsegura", null);
__decorate([
    common_1.Get('mostrar-cookies'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mostrarCookies", null);
__decorate([
    common_1.Get('parametros-consulta/:nombre/:otroParametro'),
    common_1.HttpCode(200),
    common_1.Header('Cache-control', 'none'),
    common_1.Header('EPN', 'Sistenas'),
    __param(0, common_1.Query()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosConsulta", null);
__decorate([
    common_1.Post('parametros-Cuerpo'),
    common_1.HttpCode(200),
    __param(0, common_1.Body()),
    __param(1, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosCuerpo", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map