import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import pc from '../../images/pc.png';
import salao from '../../images/salao.jpg';
import './Banner.css';

export default class Banner extends Component {
    render() {
        return (
            <div className="banner">
                <div className="divImg">
                    <img src={pc} className="pc" alt="pc" />
                    <img src={salao} className="salao" alt="salao" />
                </div>
                <div className="flexBanner">
                    <div className="txtCadastrar">
                        <div className="cadastreTitle">Cadastre seu estabelecimento no Hair Shop</div>
                        <div className="cadastreSub">Traga seus clientes, controle horários, venda seus produtos e muito mais.</div>
                    </div>
                    <div className="cadastrarSalao">
                        <Link to="/cadastro-estabelecimento">
                            <button className="btnCadastrarSalao">Cadastre seu salão</button>
                        </Link>
                    </div>
                </div>
            </div>     
        )
    }
}