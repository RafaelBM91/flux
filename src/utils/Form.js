import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      (this.props.usuario.id > 0)
      ?
        (this.props.form === 1 || this.props.form === 3)
        ?
          <div className="row">
            <div className="col-xs-6">
              <input
                className="input"
                type="text"
                data-tag="cedula"
                placeholder="Cedula"
                disabled={(this.props.cliente.id !== 0)}
                value={this.props.cliente.cedula}
                onChange={this.props._handleFormCliente}
                onKeyPress={this.props._handleCedulaClienteKey}/>
            </div>
            <div className="col-xs-6">
              <input
                className="input"
                type="text"
                data-tag="nombre"
                placeholder="Nombre"
                value={this.props.cliente.nombre}
                onChange={this.props._handleFormCliente}/>
            </div>
            <div className="col-xs-6">
              <input
                className="input"
                type="text"
                data-tag="telefono"
                placeholder="Telefono"
                value={this.props.cliente.telefono}
                onChange={this.props._handleFormCliente}/>
            </div>
            <div className="col-xs-6">
              <input
                className="input"
                type="text"
                placeholder="Buscar Articulo"
                value={this.props.buscarArticulo}
                onChange={this.props._handleBuscarArticulo}/>
            </div>
            <div className="col-xs-2">
              <input
                className="button is-primary"
                type="button"
                value="Guardar"/>
            </div>
            <div className="col-xs-2">
              <input
                className="button is-danger"
                type="button"
                value="Cancelar"
                onClick={this.props._handleCancelar}/>
            </div>
          </div>
        :
          (this.props.form === 2)
          ?
            <div className="row">
              <div className="col-xs-6">
                <small>Dia de Busqueda</small>
                <input
                  className="input"
                  type="date"
                  value={this.props.fechaBusqueda}
                  onChange={this.props._handleFechaBusqueda}/>
              </div>
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2">
                    <input
                      className="button is-success"
                      type="button"
                      value="Buscar"/>
                  </div>
                  <div className="col-xs-2">
                    <input
                      className="button is-danger"
                      type="button"
                      value="Cancelar"
                      onClick={this.props._handleCancelar}/>
                  </div>
                </div>
              </div>
            </div>
          :
            (this.props.form === 5)
            ?
              <div className="row">
                <div className="col-xs-6">
                  <small>Dia de Busqueda</small>
                  <input
                    className="input"
                    type="month"
                    value={this.props.fechaBusqueda}
                    onChange={this.props._handleFechaBusqueda}/>
                </div>
                <div className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-2">
                      <input
                        className="button is-success"
                        type="button"
                        value="Buscar"/>
                    </div>
                    <div className="col-xs-2">
                      <input
                        className="button is-danger"
                        type="button"
                        value="Cancelar"
                        onClick={this.props._handleCancelar}/>
                    </div>
                  </div>
                </div>
              </div>
            :
              (this.props.form === 6)
              ?
                <div className="row">
                  <div className="col-xs-6">
                    <input
                      className="input"
                      type="text"
                      data-tag="descripcion"
                      placeholder="Descripcion"
                      value={this.props.articulo.descripcion}
                      onChange={this.props._handleFormArticulo}/>
                  </div>
                  <div className="col-xs-6">
                    <input
                      className="input"
                      type="text"
                      data-tag="precio"
                      placeholder="Precio"
                      value={this.props.articulo.precio}
                      onChange={this.props._handleFormArticulo}/>
                  </div>
                  <div className="col-xs-6">
                    <input
                      className="input"
                      type="text"
                      data-tag="stock"
                      placeholder="Stock (cantidad)"
                      value={this.props.articulo.stock}
                      onChange={this.props._handleFormArticulo}/>
                  </div>
                  <div className="col-xs-6">
                    <input
                      className="input"
                      type="text"
                      placeholder="Buscar Articulo"
                      value={this.props.buscarArticulo}
                      onChange={this.props._handleBuscarArticulo}/>
                  </div>
                  <div className="col-xs-2">
                    <input
                      className="button is-primary"
                      type="button"
                      value="Guardar"/>
                  </div>
                  <div className="col-xs-2">
                    <input
                      className="button is-warning"
                      type="button"
                      value="Editar"/>
                  </div>
                  <div className="col-xs-2">
                    <input
                      className="button is-danger"
                      type="button"
                      value="Cancelar"
                      onClick={this.props._handleCancelar}/>
                  </div>
                </div>
              :
                (this.props.form === 7)
                ?
                  <div className="row">
                  </div>
                :
                  <div></div>
      :
        <div></div>
    );
  }
}

export default Form;
