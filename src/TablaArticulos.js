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
          <Tabla1
            articulos={this.props.articulos}
            selectArticulos={this.props.selectArticulos}
            _handleAddArticulo={this.props._handleAddArticulo}
            _handleSubArticulo={this.props._handleSubArticulo} />
        :
          (
            this.props.form === 2 ||
            this.props.form === 4 ||
            this.props.form === 5
          )
          ?
            <Tabla2 />
          :
            (
              this.props.form === 6
            )
            ?
              <Tabla3
                articulos={this.props.articulos}
                _handleSelectArticulo={this.props._handleSelectArticulo}/>
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
  ImprimeSelect(index) {
    let { selectArticulos } = this.props;
    let find = selectArticulos.index.indexOf(index);
    return (find !== -1) ? selectArticulos.select[find] : 0;
  }
  render() {
    const { articulos } = this.props;
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
                className="fa fa-arrow-up"
                disabled={!(this.ImprimeSelect(rowIndex) < articulos[rowIndex].stock)}
                value={rowIndex}
                onClick={this.props._handleAddArticulo} >
              </button>
              <span style={{marginLeft:'5px',marginRight:'5px'}}>
              {
                this.ImprimeSelect(rowIndex).toString()
              }
              </span>
              <button
                type="button"
                className="fa fa-arrow-down"
                disabled={!(this.ImprimeSelect(rowIndex) > 0)}
                value={rowIndex}
                onClick={this.props._handleSubArticulo} >
              </button>
            </Cell>
          )}
          width={116} />
      </Table>
    );
  }
}

class Tabla2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Table
        rowHeight={30}
        rowsCount={0}
        width={666}
        height={345}
        headerHeight={30} >
        <Column
          header={<Cell>Descripcion</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}></Cell>
          )}
          width={250} />
        <Column
          header={<Cell>Precio</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}></Cell>
          )}
          width={150} />
        <Column
          header={<Cell>Cantidad</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}></Cell>
          )}
          width={100} />
        <Column
          header={<Cell>SubTotal</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}></Cell>
          )}
          width={116} />
      </Table>
    );
  }
}

class Tabla3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { articulos } = this.props;
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
                className="fa fa-check"
                value={JSON.stringify(articulos[rowIndex])}
                onClick={this.props._handleSelectArticulo} >
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

