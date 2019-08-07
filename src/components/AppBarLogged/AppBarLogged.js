import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from "react-router-dom";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Popover from 'react-tiny-popover'
import './AppBarLogged.css';

class AppBarLogged extends Component {

    constructor(props){
        super(props);
		this.state = {
            logout: false,
            goHome: false,
            goMinhaConta: false,
            popover: false
		}
    }

    logout = () => {
        this.setState({ logout: true })
    }

    goHome = () => {
        this.setState({ goHome: true })
    }

    goMinhaConta = () => {
        this.setState({ goMinhaConta: true })
    }

    render() {
		if (this.state.logout === true) {
			return <Redirect to='/' />
        }

        if (this.state.goHome === true) {
			return <Redirect to='/home' />
        }

        if (this.state.goMinhaConta === true) {
			return <Redirect to='/minha-conta' />
        }
        
        return (
            <div className="appBarContainer">
                <div className="appBar">
                    <div className="titleWeb" onClick={this.goHome}>Hair Shop</div>
                    <Popover
                        isOpen={this.state.popover}
                        position={'bottom'}
                        content={(
                            <div className="contentPopover">
                                <div className="itemPopover" onClick={this.goMinhaConta}>Minha conta</div>
                                <div className="itemPopover">Meu estabelecimento</div>
                                <div className="itemPopover lastItem" onClick={this.logout}>Sair</div>
                            </div>
                        )}
                        onClickOutside={() => this.setState({ popover: false })}
                    >
                        <div onClick={() => this.setState({ popover: true })} className="divTitle">
                            <FontAwesomeIcon icon={faUser} className="svgBars"/>
                            <div className="titleMainPage">{this.props.userName}</div>
                        </div>
                    </Popover>
                    
                </div>
            </div>
        );
    }
}

export default AppBarLogged;
