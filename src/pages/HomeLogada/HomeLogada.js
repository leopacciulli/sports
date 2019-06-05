import React, { Component } from 'react';
import AppBarLogged from '../../components/AppBarLogged/AppBarLogged';
import { EstabelecimentoService } from '../../services/estabelecimentoService';
import EstabelecimentosDestaque from '../../components/EstabelecimentosDestaque/EstabelecimentosDestaque';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import LoaderMy from '../../components/Loader/LoaderMy';

import './HomeLogada.css';

class HomeLogada extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: {},
            estabelecimento: [],
            openEstabelecimento: false,
            loading: false
        }

        this.estabelecimentoService = new EstabelecimentoService();
    }

    componentDidMount() {
        const user = localStorage.getItem("user");
        this.setState({ user: JSON.parse(user) })

        this.getEstabelecimentoDestaque();
    }

    getEstabelecimentoDestaque = () => {
        this.setState({ loading: true });
        this.estabelecimentoService.getEstabelecimentos().then((value) => {
            let estabelecimento = value.data.data.filter(es => es.destaque === "1");
			this.setState({ estabelecimento, loading: false })
		}).catch((error) => {
			console.log("Api call error --> ", error);
		});
    }

    goToEstabelecimento = (es) => {
        localStorage.setItem('estabelecimento', JSON.stringify(es));
        this.setState({ openEstabelecimento: true })
    }

    render() {
        if (this.state.openEstabelecimento){
            return <Redirect to='/estabelecimento' />
        }

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
                        {this.state.loading
                            ? <LoaderMy className="loaderDestaque" />
                            : this.state.estabelecimento.map(es => {
                                return <EstabelecimentosDestaque 
                                    imagem={es.imagem}
                                    logradouro={es.logradouro}
                                    numero={es.numero}
                                    bairro={es.bairro}
                                    goToEstabelecimento={() => this.goToEstabelecimento(es)}
                                />
                            })
                        } 
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeLogada;
