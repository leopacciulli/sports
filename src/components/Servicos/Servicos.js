import React, { Component } from 'react'
import './Servicos.css';

export default class Servicos extends Component {
    render() {
        return (
            <div className="servicos">
                {this.props.entrar &&
                    <button className="btnConhecaServico">Conheça</button>
                }
                <div className="backImg"></div>
                <img src={this.props.imagem} className="imgServ" alt="produto"/>
                <div className="divServ">
                    <div className="titleServ">{this.props.salao} - {this.props.servico}</div>
                    <div className="descServ">{this.props.local}</div>
                    <div className="descServ">A partir de <div className="preco">R$ {this.props.preco}</div></div>
                </div>
            </div>     
        )
    }
}