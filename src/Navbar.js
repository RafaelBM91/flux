import React, { Component } from 'react';

import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnNavBar: [],
    };
  }
  render() {
    return (
        <nav className="col-xs-12">
        {
          (this.props.usuario.id !== 0)
          ?
            <div className="tabs">
              <ul>
              {
                this.props.btnNavBar.map((btn,index) => {
                  return (
                      (this.props.usuario.grado <= btn.grado)
                      ?
                        <li
                          key={`li-navbar-${index}`}
                          className={ ((btn.id === this.props.form) ? 'is-active' : '') }
                          onClick={this.props._handleNavbar.bind(this.props._self,btn.id)} >
                          <a>
                            <span className="icon is-small"><i className={`fa fa-${btn.icon}`}></i></span>
                            <span>{btn.text}</span>
                          </a>
                        </li>
                      :
                        <li key={`li-navbar-${index}`}></li>
                  );
                })
              }
              </ul>
            </div>
          :
            <div></div>
        }
        </nav> 
    );
  }
}

export default Navbar;