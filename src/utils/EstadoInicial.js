import NavBtn from './NavBtn';

export default (
  form = 1,
  usuario = { id: 0, cedula: '', nombre: '', grado: 0, clave: '', },
  cliente = { id: 0, cedula: '', nombre: '', telefono: '' },
) => {
  return {
    btnNavBar: NavBtn(),
    form,
    usuario,
    usuarioIngreso: { cedula: '19529584', clave: '2017' },
    articulos: [],
    selectArticulos: { articulos: [], select: [], index: [], },
    buscarArticulo: '',
    fechaBusqueda: '',
    cliente,
    articulo: { id: 0, descripcion: '', precio: 0.00, stock: 0 },
  }
}