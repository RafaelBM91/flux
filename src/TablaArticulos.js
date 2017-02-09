import React, { Component } from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import numeral from 'numeral';

class TablaArticulos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      (this.props.usuario.id !== 0)
      ?
        (
          this.props.form === 1 ||
          this.props.form === 3 ||
          this.props.form === 6
        )
        ?
          <Tabla1
            articulos={this.props.articulos}
            selectArticulos={this.props.selectArticulos}
            _self={this.props._self}
            _handleAddArticulo={this.props._handleAddArticulo}
            _handleSubArticulo={this.props._handleSubArticulo} />
        :
          <div></div>
      :
        <div></div>
    );
  }
}

class Tabla1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { articulos, selectArticulos } = this.props;
    return (
      <Table
        rowHeight={30}
        rowsCount={articulos.length}
        width={666}
        height={345}
        headerHeight={30} >
        <Column
          header={<Cell>Descripcion</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {articulos[rowIndex].descripcion}
            </Cell>
          )}
          width={250} />
        <Column
          header={<Cell>Precio</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {
                numeral(articulos[rowIndex].precio).format('0,0.00')
              } Bs
            </Cell>
          )}
          width={150} />
        <Column
          header={<Cell>Cantidad</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {articulos[rowIndex].stock}
            </Cell>
          )}
          width={100} />
        <Column
          header={<Cell>Seleccionar</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              <button
                type="button"
                disabled={(articulos[rowIndex].select === articulos[rowIndex].stock)}
                onClick={this.props._handleAddArticulo.bind(this.props._self,rowIndex)} >
                <i className="fa fa-arrow-up" aria-hidden="true"></i>
              </button>
              <span style={{marginLeft:'5px',marginRight:'5px'}}>
                {selectArticulos[rowIndex].select}
              </span>
              <button
                type="button"
                disabled={(articulos[rowIndex].select === 0)}
                onClick={this.props._handleSubArticulo.bind(this.props._self,rowIndex)} >
                <i className="fa fa-arrow-down" aria-hidden="true"></i>
              </button>
            </Cell>
          )}
          width={116} />
      </Table>
    );
  }
}

export default TablaArticulos;

/*

*/

