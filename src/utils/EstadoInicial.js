import NavBtn from './NavBtn';

export default (
  form = 1,
  usuario = { id: 0, cedula: '', nombre: '', grado: 3, clave: '', },
) => {
  return {
    btnNavBar: NavBtn(),
    form,
    usuario,
    usuarioIngreso: { cedula: '19529584', clave: '2017' },
    articulos: [],
    selectArticulos: [],
    buscarArticulo: '',
    fechaBusqueda: '',
    cliente: { id: 0, cedula: '', nombre: '', telefono: '' },
  }
}