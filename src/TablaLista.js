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
          <Tabla1 selectArticulos={this.props.selectArticulos} />
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
    let { selectArticulos } = this.props;
    return (
      <Table
        rowHeight={30}
        rowsCount={selectArticulos.articulos.length}
        width={1344}
        height={340}
        headerHeight={30} >
        <Column
          header={<Cell>Descripcion</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {selectArticulos.articulos[rowIndex].descripcion}
            </Cell>
          )}
          width={250} />
        <Column
          header={<Cell>Cantidad</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {selectArticulos.select[rowIndex]}
            </Cell>
          )}
          width={100} />
        <Column
          header={<Cell>Precio c/u</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {
                numeral(selectArticulos.articulos[rowIndex].precio).format('0,0.00')
              } Bs
            </Cell>
          )}
          width={150} />
        <Column
          header={<Cell>Sub Total</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {
                numeral(
                  selectArticulos.articulos[rowIndex].precio
                  *
                  selectArticulos.select[rowIndex]
                ).format('0,0.00')
              } Bs
            </Cell>
          )}
          width={150} />
      </Table>
    );
  }
}

export default TablaArticulos;
