import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'prueba',
  'dev',
  'sistema',
  {
    dialect: 'mysql',
  }
);

const Cliente = sequelize.define('cliente',{
  cedula: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

const Articulo = sequelize.define('articulo',{
  descripcion: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  precio: {
    type: Sequelize.FLOAT(8,2),
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Compromiso = sequelize.define('compromiso',{
  operacion: {        //vanta- pedido
    type: Sequelize.STRING,
    allowNull: false,
  },
  estado: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'activo', //activo - proceso - cancelado - anulado
  }
});

const Detalle = sequelize.define('detalle',{
  cantidad: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  precio: {
    type: Sequelize.FLOAT(8,2),
    allowNull: false,
  },
});

const Abono = sequelize.define('abono',{
  pago: {
    type: Sequelize.FLOAT(8,2),
    allowNull: false,
  },
});

const Usuario = sequelize.define('usuario',{
  cedula: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  clave: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  grado: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Cliente.hasMany(Compromiso);
Compromiso.belongsTo(Cliente);

Compromiso.hasMany(Detalle);
Detalle.belongsTo(Compromiso);

Articulo.hasMany(Detalle);
Detalle.belongsTo(Articulo);

Compromiso.hasMany(Abono);
Abono.belongsTo(Compromiso);

sequelize.sync();

export default sequelize;
