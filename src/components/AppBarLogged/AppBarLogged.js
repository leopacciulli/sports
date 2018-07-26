import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './AppBarLogged.css';

class AppBarLogged extends Component {

    logout = () => {
        alert("Logout")
    }

    render() {
        return (
            <div className="appBarContainer">
                <div className="appBar">
                    <div className="divTitle">
                        <div className="titleMainPage">1º Marathon Event - Sports Center</div>
                    </div>
                    <FontAwesomeIcon icon={faSignOutAlt} className="svgBars" onClick={this.logout}/>
                </div>
            </div>
        );
    }
}

export default AppBarLogged;
