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
          this.props.form === 3
        )
        ?
          <Tabla1 articulos={this.props.articulos} />
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
    this.state = {
      articulos: [],
    };
  }
  componentWillReceiveProps() {
    let { articulos } = this.props;
    articulos = articulos.filter(elemento => {
      return (elemento.select > 0) ? elemento : null;
    });  
    this.setState({ articulos });
  }
  render() {
    let { articulos } = this.state;
    return (
      <Table
        rowHeight={30}
        rowsCount={articulos.length}
        width={1344}
        height={340}
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
          header={<Cell>Cantidad</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {articulos[rowIndex].select}
            </Cell>
          )}
          width={100} />
        <Column
          header={<Cell>Precio c/u</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {
                numeral(articulos[rowIndex].precio).format('0,0.00')
              } Bs
            </Cell>
          )}
          width={150} />
        <Column
          header={<Cell>Sub Total</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {
                numeral(articulos[rowIndex].precio * articulos[rowIndex].select).format('0,0.00')
              } Bs
            </Cell>
          )}
          width={150} />
      </Table>
    );
  }
}

export default TablaArticulos;
