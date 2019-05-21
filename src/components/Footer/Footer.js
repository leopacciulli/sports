import React, { Component } from 'react'
import face from '../../images/face.png';
import insta from '../../images/instagram.png';
import linkedin from '../../images/linkedin.png';
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="redes">
                    <a href="https://www.linkedin.com/in/leonardo-pacciulli-a4b86a92/" target="_blank" title="LinkedIn">
                        <img src={linkedin} alt="linkedin"/>
                    </a>
                    <a href="https://www.instagram.com/leopacciulli/?hl=pt-br" target="_blank" title="Instagram">
                        <img src={insta} alt="instagram" />
                    </a>
                    <a href="https://www.facebook.com/paculli" target="_blank" title="Facebook">
                        <img src={face} alt="facebook" />
                    </a>
                </div>
                <div className="direitos">© 2019 HAIR BEAUTIFUL & CIA. Todos os direitos reservados.</div>
            </div>     
        )
    }
}