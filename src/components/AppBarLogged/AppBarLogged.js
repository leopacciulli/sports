import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from "react-router-dom";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './AppBarLogged.css';

class AppBarLogged extends Component {

    constructor(props){
        super(props);
		this.state = {
            logout: false,
            goHome: false
		}
    }

    logout = () => {
        this.setState({ logout: true })
    }

    goHome = () => {
        this.setState({ goHome: true })
    }

    render() {
        //se encontrar usuário registrado vai pra home logada
		if (this.state.logout === true) {
			return <Redirect to='/hairshop' />
        }

        if (this.state.goHome === true) {
			return <Redirect to='/home' />
        }

        /**
            <div className="divBusca">
                <input placeholder="Encontre um estabelecimento" className="busca" />
            </div>
         */
        
        return (
            <div className="appBarContainer">
                <div className="appBar">
                    <div className="titleWeb" onClick={this.goHome}>Hair Shop</div>
                    <div className="divTitle">
                        <FontAwesomeIcon icon={faUser} className="svgBars"/>
                        <div className="titleMainPage">{this.props.userName}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppBarLogged;
