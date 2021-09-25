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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BandaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let BandaService = class BandaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    buscarUno(id) {
        return this.prisma.bANDA_MUSICAL.findUnique({
            where: { id: id },
        });
    }
    crearUno(banda) {
        return this.prisma.bANDA_MUSICAL.create({ data: banda });
    }
    buscarMuchos(parametrosBusqueda) {
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
    actualizarUno(parametrosActualizar) {
        return this.prisma.bANDA_MUSICAL.update({
            data: parametrosActualizar.data,
            where: { id: parametrosActualizar.id },
        });
    }
    eliminarUno(id) {
        return this.prisma.bANDA_MUSICAL.delete({
            where: { id: id },
        });
    }
};
BandaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BandaService);
exports.BandaService = BandaService;
//# sourceMappingURL=banda.service.js.map