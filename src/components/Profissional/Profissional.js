import React, { Component } from 'react';

import './Profissional.css';

export default class Profissional extends Component {
    
    render() {
        return (
            <div className={this.props.selected ? "profissional profissionalSelecionado" : "profissional"} onClick={this.props.selecionarProfissional}>
                <img src={this.props.fotoProfissional} className="fotoProfissional" />
                <div className="nomeProfissional">{this.props.nomeProfissional}</div>
            </div>   
        )
    }
}