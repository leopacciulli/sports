import React, { Component } from 'react';
import './Modality.css';

class Modality extends Component {

    render() {
        return (
            <div className="modality">
                <div className="titleModality">{this.props.title}</div>
                <img src={this.props.img} className={this.props.classImg} alt="imageNotFound" />
            </div>
        );
    }
}

export default Modality;
