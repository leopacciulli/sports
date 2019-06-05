import React, { Component } from 'react'
import './EstabelecimentosDestaque.css';

export default class EstabelecimentosDestaque extends Component {
    render() {
        return (
            <div className="estabelecimentosDestaque">
                <img src={this.props.imagem} className="imgEstabelecimentoDestaque" alt="produto"/>
                <div className="infoEstabelecimento">
                    <div className="txtEstabelecimento">{this.props.logradouro}, {this.props.numero} - {this.props.bairro}</div>
                    <button onClick={this.props.goToEstabelecimento} className="btnConhecaEstabelecimento">Conheça</button>
                </div>
            </div>     
        )
    }
}