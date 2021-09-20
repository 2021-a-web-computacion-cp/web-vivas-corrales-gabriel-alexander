import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    //modsulos importados
  ],
  providers: [
    UsuarioService,
    PrismaService,
    //declaramos servicio
  ],
  exports: [
    UsuarioService,
    //exportamos servicio
  ],
  controllers: [
    UsuarioController,
    //declaramos controladores
  ],
})
export class UsuarioModule {}
