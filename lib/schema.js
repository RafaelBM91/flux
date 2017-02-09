import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import GraphQLDate from 'graphql-date';

import datos from './datos';

const Cliente = new GraphQLObjectType({
  name: 'Clientes',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve({id}) {
          return id;
        },
      },
      cedula: {
        type: GraphQLString,
        resolve({cedula}) {
          return cedula;
        },
      },
      nombre: {
        type: GraphQLString,
        resolve({nombre}) {
          return nombre;
        }
      },
      telefono: {
        type: GraphQLString,
        resolve({telefono}) {
          return telefono;
        }
      },
    }
  }
});

const Articulo = new GraphQLObjectType({
  name: 'Articulo',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve({id}) {
          return id;
        },
      },
      descripcion: {
        type: GraphQLString,
        resolve({descripcion}) {
          return descripcion;
        },
      },
      precio: {
        type: GraphQLFloat,
        resolve({precio}) {
          return precio;
        }
      },
      stock: {
        type: GraphQLInt,
        resolve({stock}) {
          return stock;
        }
      },
    }
  }
});

const Compromiso = new GraphQLObjectType({
  name: 'Compromiso',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve({id}) {
          return id;
        },
      },
      operacion: {
        type: GraphQLString,
        resolve({operacion}) {
          return operacion;
        },
      },
      estado: {
        type: GraphQLString,
        resolve({estado}) {
          return estado;
        },
      },
      createdAt: {
        type: GraphQLDate,
        resolve({createdAt}) {
          return createdAt;
        },
      },
      cliente: {
        type: new GraphQLList(Cliente),
        resolve({clienteId}) {
          return datos.models.cliente.findAll({where: {id: clienteId}});
        },
      },
      detalles: {
        type: new GraphQLList(Detalle),
        resolve({id}) {
          return datos.models.detalle.findAll({where: {compromisoId: id}});
        },
      },
      abonos: {
        type: new GraphQLList(Abono),
        resolve({id}) {
          return datos.models.abono.findAll({where: {compromisoId: id}});
        },
      }
    }
  }
});

const Detalle = new GraphQLObjectType({
  name: 'Detalle',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve({id}) {
          return id;
        },
      },
      cantidad: {
        type: GraphQLInt,
        resolve({cantidad}) {
          return cantidad;
        },
      },
      precio: {
        type: GraphQLFloat,
        resolve({precio}) {
          return precio;
        },
      },
      articulo: {
        type: new GraphQLList(Articulo),
        resolve({articuloId}) {
          return datos.models.articulo.findAll({where:{id: articuloId}});
        },
      },
    }
  }
});

const Abono = new GraphQLObjectType({
  name: 'Abono',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve({id}) {
          return id;
        },
      },
      pago: {
        type: GraphQLFloat,
        resolve({pago}) {
          return pago;
        },
      },
      createdAt: {
        type: GraphQLDate,
        resolve({createdAt}) {
          return createdAt;
        },
      }
    }
  }
});

const Usuario = new GraphQLObjectType({
  name: 'Usuario',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve({id}) {
          return id;
        },
      },
      cedula: {
        type: GraphQLString,
        resolve({cedula}) {
          return cedula;
        },
      },
      nombre: {
        type: GraphQLString,
        resolve({nombre}) {
          return nombre;
        },
      },
      clave: {
        type: GraphQLString,
        resolve({clave}) {
          return clave;
        },
      },
      grado: {
        type: GraphQLInt,
        resolve({grado}) {
          return grado;
        },
      },
    }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      clientes: {
        type: new GraphQLList(Cliente),
        args: {
          id: {
            type: GraphQLInt,
          },
          cedula: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          return datos.models.cliente.findAll({where: args});
        }
      },
      articulos: {
        type: new GraphQLList(Articulo),
        args: {
          id: {
            type: GraphQLInt,
          },
          descripcion: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          if (args.descripcion !== undefined)
            return datos.models.articulo.findAll( {where: { descripcion: { $like: args.descripcion } } });
          else
            return datos.models.articulo.findAll({where: args});
        }
      },
      compromisos: {
        type: new GraphQLList(Compromiso),
        args: {
          id: {
            type: GraphQLInt,
          },
          clienteId: {
            type: GraphQLInt,
          },
          operacion: {
            type: GraphQLString,
          },
          estado: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          return datos.models.compromiso.findAll({where: args});
        }
      },
      usuario: {
        type: new GraphQLList(Usuario),
        args: {
          cedula: {
            type: new GraphQLNonNull(GraphQLString),
          },
          clave: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, args) {
          return datos.models.usuario.findAll({where: args});
        }
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields () {
    return {
      addCliente: {
        type: Cliente,
        args: {
          cedula: {
            type: new GraphQLNonNull(GraphQLString),
          },
          nombre: {
            type: new GraphQLNonNull(GraphQLString),
          },
          telefono: {
            type: GraphQLString,
          },
        },
        resolve(source, {cedula,nombre,telefono}) {
          return datos.models.cliente.create({
            cedula,
            nombre,
            telefono,
          });
        },
      },
      addArticulo: {
        type: Articulo,
        args: {
          descripcion: {
            type: new GraphQLNonNull(GraphQLString),
          },
          precio: {
            type: new GraphQLNonNull(GraphQLFloat),
          },
          stock: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(source, {descripcion,precio,stock}) {
          return datos.models.articulo.create({
            descripcion,
            precio,
            stock,
          });
        },
      },
      updCliente: {
        type: Cliente,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          nombre: {
            type: new GraphQLNonNull(GraphQLString),
          },
          telefono: {
            type: GraphQLString,
          },
        },
        resolve(source, {id,nombre,telefono}) {
          return datos.models.cliente.update(
            {
              nombre,
              telefono,
            },
            { where: {id: id} }
          );
        },
      },
      updArticulo: {
        type: Articulo,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          descripcion: {
            type: new GraphQLNonNull(GraphQLString),
          },
          precio: {
            type: new GraphQLNonNull(GraphQLFloat),
          },
          stock: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(source, {id,descripcion,precio,stock}) {
          return datos.models.articulo.update(
            {
              descripcion,
              precio,
              stock,
            },
            { where: {id: id} }
          );
        },
      },
      addCompromiso: {
        type: Compromiso,
        args: {
          operacion: {
            type: new GraphQLNonNull(GraphQLString),
          },
          estado: {
            type: new GraphQLNonNull(GraphQLString),
          },
          clienteId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(source, {operacion,estado,clienteId}) {
          return datos.models.compromiso.create({
            operacion,
            estado,
            clienteId,
          });
        },
      },
      addDetalle: {
        type: Detalle,
        args: {
          cantidad: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          precio: {
            type: new GraphQLNonNull(GraphQLFloat),
          },
          compromisoId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          articuloId: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(source, {cantidad,precio,compromisoId,articuloId}) {
          return datos.models.detalle.create({
            cantidad,
            precio,
            compromisoId,
            articuloId
          });
        },
      },
      updArticuloCantidad: {
        type: Articulo,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          stock: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(source, {id,stock}) {
          return datos.models.articulo.update(
            {
              stock: stock,
            },
            { where: {id: id} }
          );
        },
      },
      addAbono: {
        type: Detalle,
        args: {
          pago: {
            type: new GraphQLNonNull(GraphQLFloat),
          },
          compromisoId: {
            type: new GraphQLNonNull(GraphQLInt),            
          }
        },
        resolve(source, {pago,compromisoId}) {
          return datos.models.abono.create({
            pago,
            compromisoId
          });
        },
      },
      anulaCompromiso: {
        type: Compromiso,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(source, {id}) {
          return datos.models.compromiso.update(
            {
              estado: 'anulado',
            },
            { where: {id: id} }
          );
        },
      },
      addUsuario: {
        type: Usuario,
        args: {
          cedula: {
            type: new GraphQLNonNull(GraphQLString),
          },
          nombre: {
            type: new GraphQLNonNull(GraphQLString),
          },
          clave: {
            type: new GraphQLNonNull(GraphQLString),
          },
          grado: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(source, {cedula,nombre,clave,grado}) {
          return datos.models.usuario.create({
            cedula,
            nombre,
            clave,
            grado,
          });
        },
      },
      updUsuario: {
        type: Usuario,
        args: {
          cedula: {
            type: new GraphQLNonNull(GraphQLString),
          },
          nombre: {
            type: new GraphQLNonNull(GraphQLString),
          },
          clave: {
            type: new GraphQLNonNull(GraphQLString),
          },
          grado: {
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve(source, {cedula,nombre,clave,grado}) {
          return datos.models.usuario.update(
            {
              nombre,
              clave,
              grado,
            },
            { where: {cedula: cedula} }
          );
        },
      },
      delUsuario:{
        type: Usuario,
        args: {
          cedula: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(source, {cedula}) {
          return datos.models.usuario.destroy({where:{cedula}});
        },
      },
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
