import React, { Component } from 'react'
import './HomeDeslogada.css';
import Header from './Header';

export default class HomeDeslogada extends Component {

    componentDidMount() {
        localStorage.removeItem("user");
        localStorage.clear();
    }

    render() {
        return (
            <div>
                <div className="headerHomeDeslogada">
                    <div className="backBlack"></div>
                    <Header login={this.props.login} dadosInvalidos={this.props.dadosInvalidos} />
                </div>
            </div>
        )
    }
}