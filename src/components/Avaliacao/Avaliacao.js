import React, { Component } from 'react';
import Rating from "react-rating";
import emptyStar from "../../images/icons/starEmpty.png";
import fullStar from "../../images/icons/starFull.png";
import moment from "moment";

import './Avaliacao.css';

export default class Avaliacao extends Component {
    
    render() {
        console.log("POP", this.props.avaliarDisabled )
        return (
            <div className="avaliacao">
                {this.props.hasAvaliacao.length === 0
                    ? <div className="flexAvaliacao">
                        <div className="semAvaliacao">Esse estabelecimento ainda não possui nenhuma avaliação.</div>
                        <div className="divAvaliar">
                            <div className="flexRating">
                                <div className="txtAvaliar">Faça sua avaliação</div>
                                <Rating 
                                    emptySymbol={<img src={emptyStar} className="iconStar starEmpty" />} 
                                    fullSymbol={<img src={fullStar} className="iconStar starFull" />} 
                                    initialRating={this.props.qtdeAvaliacao}
                                    onClick={this.props.avaliarEstrelas}
                                />
                            </div>
                            <textarea name="avaliacao" onChange={this.props.setValueAvaliacao} value={this.props.valueAvaliacao} maxLength={250} rows="10" cols="30" className="inputAvaliar"/>
                            <div className="divBtnAvaliar">
                                <button className="btnAvaliar" onClick={this.props.avaliar}>Avaliar</button>
                            </div>
                        </div>
                    </div>
                    : <div className="avaliado"> 
                        <div className="comAvaliacao">Obrigado por deixar a sua avaliação.</div>    
                        <div className="divAvaliacoes">
                            {this.props.avaliacoesUser.map(item => {
                                return <div className="avaliacaoUsuario" key={item.id}>
                                    <div className="flexTopoAvaliacao">
                                        <div className="nomeUsuario">{item.nomeUsuario}</div>
                                        <Rating 
                                            emptySymbol={<img src={emptyStar} className="iconStar starEmpty" />} 
                                            fullSymbol={<img src={fullStar} className="iconStar starFull" />} 
                                            initialRating={item.qtdeAvaliacao}
                                            readonly={true}
                                        />
                                    </div>
                                    <div className="emailUsuario">{item.emailUsuario}</div>
                                    <div className="avaliacaoDoUsuario">{item.avaliacao}</div>
                                    <div className="dataAvaliacao">Avaliado em: {item.dataAvaliacao}</div>
                                </div>
                            })}
                        </div>
                        
                    </div>
                }
            </div>   
        )
    }
}