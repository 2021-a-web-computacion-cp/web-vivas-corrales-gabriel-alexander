import {Get, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//DECORADOR: Funciones
@Module({
  imports: [], //modulos importados
  controllers: [AppController], //controladores del modulo
  providers: [AppService], //servicios del modulo
  exports: [AppService], //Servicios exportados ( c pueden usar furera del modulo)
})
export class AppModule {}

