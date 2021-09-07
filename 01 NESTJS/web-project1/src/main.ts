import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser'); //Importar cosas en JS
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.static('publico')); //servidor web estático
  app.use(cookieParser('cookie secreta ejesto')); //secreto cookies
  app.use(
    //session
    session({
      name: 'server-session-id',
      secret: 'Este es el mensaje secreto',
      resave: true,
      saveUnitialized: true,
      cookie: { secure: false },
      store: new FileStore(),
    }),
  );

  await app.listen(3000); //puerto
}
bootstrap();
//en el directorio donde esté package.json ejecutamos npm run start

/*
//TIPOS DE VARIABLES

//Mutables( pueden ser reasignadas)

let variableUno = 1; //NO USAR VAR
let variableDos = 2;
variableUno = 3;
variableDos = 5;

//INMUTABLES ( NO reasignables)
const variableTres = 5;

//VARIABLES PRIMITIVAS (Typesript)
const texto = ''; //"" tildes invertidas
const numeroEntero = 1;
const numeroFlotante = 1.2;
const soyEstudiante = true;
const noDefinido = undefined;
const noHayNada = null;
const fecha: Date = new Date();

//DUCK TYPING
const textoDos = 'Gabo';
let cualquierCosa: any = 'sad';
cualquierCosa = 1;
cualquierCosa = true;
cualquierCosa = new Date();

//CLASES

class Usuario {
  constructor(public nombre: string, public apellido: string) {}
}

const usuario: Usuario = new Usuario('Gabo', 'Vivas');
usuario.nombre;
usuario.apellido;

interface UsuarioInterface {
  nombre: string;
  apellido: string;
  edad?: number; // ? Opcional //Valor por defecto es undefined
}

const objetoUsuario: UsuarioInterface = {
  nombre: 'Pedro',
  apellido: 'asd',
};

let a = 10;
let b = a;
a += 1;
b -= 1;

//objeto
let objetoEdad = {
  edad: 22,
};

let otraEdadObjeto = objetoEdad; //REFERENCIA
objetoEdad.edad += 1;
console.log(otraEdadObjeto);
//Profe
otraEdadObjeto.edad = otraEdadObjeto.edad + 1;
console.log(otraEdadObjeto.edad);
//

//clonación
let objetoClonado = { ...objetoEdad };
const arregloEjemplo = [1,2,3]
let arregloClon = [...arregloEjemplo];

//Arreglos
const arregloTodo = [1, '', true, null, new Date()];
const arregloNumeros: number[] = [1, 2, 3];

function funcionConNombre() {}

const indice = arregloNumeros.findIndex((numero: number) => {    //funcion anónima porque no tienen nombre
  const elValorEsTres: boolean = numero === 3;
  return elValorEsTres; //Condicion boolean
});

arregloNumeros[indice]=6;
arregloNumeros.push(7);//agregar final
arregloNumeros.unshift(0); //agregar inicio

//CONDICIONES -> TRUSTY & Falsy
if (0) {
  console.log('Truthy');//
} else {
  console.log('Falsy');
}

if (1) {
  console.log('Truthy');//
} else {
  console.log('Falsy');
}
if (-1) {
  console.log('Truthy');//
} else {
  console.log('Falsy');
}
if ('') {
  console.log('Truthy');
} else {
  console.log('Falsy');//
}
if ('A') {
  console.log('Truthy');//
} else {
  console.log('Falsy');
}
if ([1]) {
  console.log('Truthy');//
} else {
  console.log('Falsy');
}
if ([]) {
  console.log('Truthy');
} else {
  console.log('Falsy');//
}
if (undefined) {
  console.log('Truthy');
} else {
  console.log('Falsy');//
}
if (null) {
  console.log('Truthy');
} else {
  console.log('Falsy');//
}
if ([]) {
  console.log('Truthy');
} else {
  console.log('Falsy');//
}
if ({}) {
  console.log('Truthy');
} else {
  console.log('Falsy');//
}

if ({ a: 1 }) {
  console.log('Truthy');//
} else {
  console.log('Falsy');
}


abstract class Nombre {
  public nombrePropiedad?: string; //undefined
  private apellidoPorpiedad = 'asd';
  protected edad = 1; //number duck typing
  static comun = 10;
  propiedadPublica: string;
  constructor(
    propiedadPublicaParametro: string, //parametro
    public propiedadRapido: string, //transforma una propiedad
  ) {
    this.propiedadPublica = propiedadPublicaParametro;
    this.propiedadRapido;
  }

  public funcionPublica(parametroString: string): void {
    //no hay return = undefined
  }
  private funcionPrivada(
    parametroString: string, //? =puede ser undefined
    parametroNumber?: number,
  ) {
    //omitir: void por defecto
    //no hay return = undefined
  }

  protected funcionPublica2(): number {
    return 1;
  }

  static funcionEstatica(): string {
    return 'as';
  }
}
*/
