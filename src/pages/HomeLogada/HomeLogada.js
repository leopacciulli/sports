import React, { Component } from 'react';
import './HomeLogada.css';
import AppBarLogged from '../../components/AppBarLogged/AppBarLogged';
import { EstabelecimentoService } from '../../services/estabelecimentoService';
import EstabelecimentosDestaque from '../../components/EstabelecimentosDestaque/EstabelecimentosDestaque';

class HomeLogada extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: {},
            estabelecimento: []
        }

        this.estabelecimentoService = new EstabelecimentoService();
    }

    componentDidMount() {
        const user = localStorage.getItem("user");
        this.setState({ user: JSON.parse(user) })

        this.getEstabelecimentoDestaque();
    }

    getEstabelecimentoDestaque = () => {
        this.estabelecimentoService.then((value) => {
            let estabelecimento = value.data.data.filter(es => es.destaque === "1");
			this.setState({ estabelecimento })
		}).catch((error) => {
			console.log("Api call error --> ", error);
		});
    }

    render() {
        console.log(this.state)
        return (
            <div className="homeLogada">
                <AppBarLogged 
                    userName={this.state.user.nome}
                />
                <div className="imgDestaque"></div>
                <div className="blackDestaque"></div>

                <div className="backgroundDestaque">
                    <div className="txtDestaque">Estabelecimentos em destaque</div>
                    <div className="divEstabDestaque">
                        {this.state.estabelecimento.map(es => {
                            return <EstabelecimentosDestaque 
                                imagem={es.imagem}
                                logradouro={es.logradouro}
                                numero={es.numero}
                                bairro={es.bairro}
                            />
                        })}   
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeLogada;
