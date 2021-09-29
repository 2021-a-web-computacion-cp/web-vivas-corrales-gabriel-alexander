"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BandaModule = void 0;
const common_1 = require("@nestjs/common");
const banda_service_1 = require("./banda.service");
const prisma_service_1 = require("./prisma.service");
const banda_controller_1 = require("./banda.controller");
let BandaModule = class BandaModule {
};
BandaModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [banda_service_1.BandaService, prisma_service_1.PrismaService],
        exports: [banda_service_1.BandaService],
        controllers: [banda_controller_1.BandaController],
    })
], BandaModule);
exports.BandaModule = BandaModule;
//# sourceMappingURL=banda.module.js.map