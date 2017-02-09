import { graphql } from 'graphql';

class Funciones {
  constructor(client,Schema) {
    this.client = client;
    this.Schema = Schema;
    this.Escucha();
  }
  Escucha() {
    this.client.on('graphq:usuario',(query) => {
      this.Reapuesta('graphq:usuario',query);
    });
    this.client.on('graphq:articulos',(query) => {
      this.Reapuesta('graphq:articulos',query);
    });
    this.client.on('graphq:cliente',(query) => {
      this.Reapuesta('graphq:cliente',query);
    });
  }
  Reapuesta(socket,query) {
    let promesa = new Promise((resolve,reject) => {
      resolve( graphql(this.Schema,query) );
    });
    promesa.then((respuesta) => {
      this.client.emit(socket,respuesta);
    });
  }
}

export default Funciones;
