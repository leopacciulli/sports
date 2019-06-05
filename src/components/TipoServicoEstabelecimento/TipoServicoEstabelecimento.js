import React, { Component } from 'react'
import cabelo from "../../images/icons/cabelo.png";
import barba from "../../images/icons/barba.png";
import manicure from "../../images/icons/manicure.png";
import sombrancelha from "../../images/icons/sombrancelha.png";

import './TipoServicoEstabelecimento.css';

export default class TipoServicoEstabelecimento extends Component {
    
    render() {
        return (
            <div className="tipoServicoEstabelecimento">
                {this.props.tipoServico === "Cabelo" &&
                    <div onClick={this.props.selecionarTipoServico} 
                        className={this.props.servicoSelecionado === "Cabelo" ? "flexTipoServico servicoSelecionado" : "flexTipoServico"}>
                        <div className="iconSize">
                            <img src={cabelo} className="iconCabelo" />
                        </div>
                        <div className="infoTipoServico">Cabelo</div>
                    </div>
                }
                {this.props.tipoServico === "Barba" &&
                    <div onClick={this.props.selecionarTipoServico} 
                        className={this.props.servicoSelecionado === "Barba" ? "flexTipoServico servicoSelecionado" : "flexTipoServico"}>
                        <div className="iconSize">
                            <img src={barba} className="iconBarba" />
                        </div>
                        <div className="infoTipoServico">Barba</div>
                    </div>
                }
                {this.props.tipoServico === "Manicure" &&
                    <div onClick={this.props.selecionarTipoServico} 
                        className={this.props.servicoSelecionado === "Manicure" ? "flexTipoServico servicoSelecionado" : "flexTipoServico"}>
                        <div className="iconSize">
                            <img src={manicure} className="iconManicure" />
                        </div>
                        <div className="infoTipoServico">Manicure e Pedicure</div>
                    </div>
                }
                {this.props.tipoServico === "Sombrancelha" &&
                    <div onClick={this.props.selecionarTipoServico} 
                        className={this.props.servicoSelecionado === "Sombrancelha" ? "flexTipoServico servicoSelecionado" : "flexTipoServico"}>
                        <div className="iconSize">
                            <img src={sombrancelha} className="iconSombrancelha" />
                        </div>
                        <div className="infoTipoServico">Sombrancelha</div>
                    </div>
                }
            </div>   
        )
    }
}