import { Get, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './usuario/prisma.service';
import { UsuarioModule } from './usuario/usuario.module';

//DECORADOR: Funciones
@Module({
  imports: [UsuarioModule,], //modulos importados
  controllers: [AppController], //controladores del modulo
  providers: [AppService, PrismaService], //servicios del modulo
  exports: [AppService], //Servicios exportados ( c pueden usar furera del modulo)
})
export class AppModule {}
