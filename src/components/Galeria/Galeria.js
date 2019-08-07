import React, { Component } from 'react';

import './Galeria.css';

export default class Galeria extends Component {
    
    renderImg = () => {
        let imagens = this.props.img;
        let parseImg = JSON.parse(imagens);
        let img = parseImg.map(img => {
            return <div className="galeriaImagens">
                <img src={img} className="tagImagem" />
            </div>
        });
        return img;
    }

    render() {
        return (
            this.renderImg()
        )
    }
}