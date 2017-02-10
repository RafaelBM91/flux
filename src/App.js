import React, { Component } from 'react';
import socketIo from 'socket.io-client';

const io = socketIo('127.0.0.1:8080');

import Navbar from './Navbar';
import TablaArticulos from './TablaArticulos';
import TablaLista from './TablaLista';

import Form from './utils/Form';

import EstadoInicial from './utils/EstadoInicial';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = EstadoInicial();

    this._handleCedulaUsuario = this._handleCedulaUsuario.bind(this);
    this._handleClaveUsuario = this._handleClaveUsuario.bind(this);
    this._handleIngreso = this._handleIngreso.bind(this);

    this._handleBuscarArticulo = this._handleBuscarArticulo.bind(this);

    this._handleCedulaCliente = this._handleCedulaCliente.bind(this);
    this._handleCedulaClienteKey = this._handleCedulaClienteKey.bind(this);
    this._handleNombreCliente = this._handleNombreCliente.bind(this);
    this._handleTelefonoCliente = this._handleTelefonoCliente.bind(this);

    this._handleCancelar = this._handleCancelar.bind(this);

    this._handleFechaBusqueda = this._handleFechaBusqueda.bind(this);

    this._handleAddArticulo = this._handleAddArticulo.bind(this);
    this._handleSubArticulo = this._handleSubArticulo.bind(this);
  }

  /*** COMPONENTES ***/
  componentWillMount() {
    this.cargaListaArticulos();
  }
  componentDidMount() {
    io.on('graphq:articulos',(data) => {
      let { articulos } = data.data;
      this.setState({ articulos });
    });
    io.on('graphq:usuario',(data) => {
      let { usuario } = data.data;
      if (usuario.length > 0) {
        usuario = usuario[0];
        this.setState({ usuario });
      }
    });
    io.on('graphq:cliente',(data) => {
      let cliente = data.data.clientes[0];
      if (cliente !== undefined) {
        this.setState({ cliente });
      }
    });
  }
  
  /*** NAVBAR ***/
  _handleNavbar(form) {
    let { btnNavBar } = this.state;
    this.setState({
      btnNavBar,
      form,
      selectArticulos: { articulos: [], select: [], index: [], },
    });
    this.cargaListaArticulos();
  }

  /*** INICIO DE SESION ***/
  _handleCedulaUsuario(e) {
    let { usuarioIngreso } = this.state;
    usuarioIngreso.cedula = e.target.value;
    this.setState({ usuarioIngreso });
  }
  _handleClaveUsuario(e) {
    let { usuarioIngreso } = this.state;
    usuarioIngreso.clave = e.target.value;
    this.setState({ usuarioIngreso });
  }
  _handleIngreso() {
    io.emit('graphq:usuario',`
      {
        usuario(
          cedula:"${this.state.usuarioIngreso.cedula}",
          clave:"${this.state.usuarioIngreso.clave}"
          ){
            id
            cedula
            nombre
            grado
            clave
      }}`);
  }

  /*** SELECCION DE ARTICULOS ***/
  _handleAddArticulo(e) {
    let { articulos, selectArticulos } = this.state;
    let index = parseInt(e.target.value,10);
    let find = selectArticulos.index.indexOf(index);

    if (find > -1) {
      selectArticulos.select[find]++;
    } else {
      selectArticulos.articulos.push(articulos[index]);
      selectArticulos.select.push(1);
      selectArticulos.index.push(index);
    }
    this.setState({ selectArticulos });
  }
  _handleSubArticulo(e) {
    let { selectArticulos } = this.state;
    let index = parseInt(e.target.value,10);
    let find = selectArticulos.index.indexOf(index);
    if (selectArticulos.select[find] < 2) {
      selectArticulos.articulos.splice(find,1);
      selectArticulos.select.splice(find,1);
      selectArticulos.index.splice(find,1);
    } else {
      selectArticulos.select[find]--;
    }
    this.setState({ selectArticulos });    
  }

  /*** CARGAR LISTA ACTUALIZADA DE ARTICULOS ***/
  cargaListaArticulos() {
    io.emit('graphq:articulos','{articulos{id descripcion precio stock}}');
  }

  /*** BUSQUEDA DE ARTICULOS ***/
  _handleBuscarArticulo(e) {
    let { buscarArticulo } = this.state;
    buscarArticulo = e.target.value;
    this.setState({ buscarArticulo });
    io.emit('graphq:articulos',`
              {
                articulos(
                  descripcion:"%${buscarArticulo}%"
                ){
                    id
                    descripcion
                    precio
                    stock
              }}`);
  }

  /*** FORMULARIO DE CLIENTE ***/
  _handleCedulaCliente(e) {
    let { cliente } = this.state;
    cliente.cedula = e.target.value;
    this.setState({ cliente });
  }
  _handleCedulaClienteKey(e) {
    if (e.key === 'Enter') {
      io.emit('graphq:cliente',`
              {
                clientes(
                  cedula:"${this.state.cliente.cedula}"
                ){
                  id
                  cedula
                  nombre
                  telefono
              }}`);
    }
  }
  _handleNombreCliente(e) {
    let { cliente } = this.state;
    cliente.nombre = e.target.value;
    this.setState({ cliente });
  }
  _handleTelefonoCliente(e) {
    let { cliente } = this.state;
    cliente.telefono = e.target.value;
    this.setState({ cliente });
  }

  /*** FECHA DE BUSQUEDA ***/
  _handleFechaBusqueda(e) {
    let { fechaBusqueda } = this.state;
    fechaBusqueda = e.target.value;
    this.setState({ fechaBusqueda });
  }

  /*** CANCELAR ***/
  _handleCancelar() {
    this.setState(
      EstadoInicial(
        this.state.form,
        this.state.usuario,
      )
    );
    this.cargaListaArticulos();
  }

  render() {
    return (
      <div className="row">
        
        
        <header className="col-xs-12 center-xs" style={{lineHeight:'10px'}} >
          <div className="row">
            <div className="col-xs-3"></div>
            <div className="col-xs-6">
              <h1 className="title">Sistema de Ventas, Pedido y Almacen &nbsp;
                <span style={{fontFamily:'Lobster',fontSize:'35px',fontWeight:'bold'}}>
                  Flux
                </span>
                <i className="fa fa-copyright" style={{fontSize:'15px'}}></i>
              </h1>
              <h3 className="subtitle">V-0.0.1</h3>
            </div>
            <div className="col-xs-3" style={{textAlign:'right',paddingTop:'10px',}} >
              {
                (this.state.usuario.id !== 0)
                ?
                  <div className="" style={{lineHeight:'14px'}}>
                    <i className="fa fa-vcard-o"></i>
                    <span>&nbsp;&nbsp;{this.state.usuario.nombre}&nbsp;&nbsp;</span>
                  </div>
                :
                  <div></div>
              }
            </div>
          </div>
        </header>
        

        <Navbar
          usuario={this.state.usuario}
          form={this.state.form}
          btnNavBar={this.state.btnNavBar}
          _handleNavbar={this._handleNavbar}
          _self={this} />


        <section className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-6 work-left">
                  
                  <Form
                    usuario={this.state.usuario}
                    form={this.state.form}
                    cliente={this.state.cliente}
                    buscarArticulo={this.state.buscarArticulo}
                    fechaBusqueda={this.state.fechaBusqueda}
                    _handleFechaBusqueda={this._handleFechaBusqueda}
                    _handleCedulaCliente={this._handleCedulaCliente}
                    _handleCedulaClienteKey={this._handleCedulaClienteKey}
                    _handleNombreCliente={this._handleNombreCliente}
                    _handleTelefonoCliente={this._handleTelefonoCliente}
                    _handleBuscarArticulo={this._handleBuscarArticulo}
                    _handleCancelar={this._handleCancelar}/>

                </div>
                <div className="col-xs-6 work-right">

                  <TablaArticulos
                    usuario={this.state.usuario}
                    articulos={this.state.articulos}
                    selectArticulos={this.state.selectArticulos}
                    _handleAddArticulo={this._handleAddArticulo}
                    _handleSubArticulo={this._handleSubArticulo}
                    form={this.state.form} />

                </div>
              </div>
            </div>
            <div className="col-xs-12 table-bottom" style={{paddingTop:'5px',paddingLeft:'20px'}}>
              <TablaLista
                usuario={this.state.usuario}
                selectArticulos={this.state.selectArticulos}
                form={this.state.form} />
            </div>
          </div>
        </section>

        {
          (this.state.usuario.id === 0)
          ?
            <div className="intro row center-xs">
              <div className="col-xs-3 col-xs-offset-4 center-xs entrada">
                <div className="row">
                  <div className="col-xs-12 title">BIENVENIDO</div>
                  <div className="col-xs-12">
                    <input
                      className="input"
                      type="text"
                      placeholder="Cedula"
                      value={this.state.usuarioIngreso.cedula}
                      autoFocus={true}
                      onChange={this._handleCedulaUsuario} />
                  </div>
                  <div className="col-xs-12">
                    <input
                      className="input"
                      type="password"
                      placeholder="Contraseña"
                      value={this.state.usuarioIngreso.clave}
                      onChange={this._handleClaveUsuario}/>
                  </div>
                  <div className="col-xs-12">
                    <input
                      className="button is-primary"
                      type="button"
                      value="Ingresar"
                      onClick={this._handleIngreso}/>
                  </div>
                </div>
              </div>
            </div>
          :
            <div></div>
        }


        <footer className="col-xs-12 center-xs" style={{lineHeight:'14px'}}>
          <span>
              Sistema de Ventas, Pedido y Almacen Flux &nbsp;&nbsp;
              <i className="fa fa-copyright"></i>
              &nbsp;&nbsp; By Ing. Rafael Briceño <a href="/">@rafaelbm91</a>
          </span>
        </footer>


      </div>
    );
  }
}

export default App;

/*

*/