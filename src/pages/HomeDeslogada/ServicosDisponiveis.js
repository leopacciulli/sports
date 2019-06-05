import React, { Component } from 'react'
import './ServicosDisponiveis.css';
import Servicos from '../../components/Servicos/Servicos';
import { DisponibilidadesService } from '../../services/disponibilidadesService';
import LoaderMy from '../../components/Loader/LoaderMy';

export default class ServicosDisponiveis extends Component {

    constructor(props){
        super(props);
        this.state = {
            servicos: [],
            loading: false
        }

        this.disponibilidadesService = new DisponibilidadesService();
    }

    componentDidMount() {
        this.getServices();
        
	}

	getServices = () => {
        this.setState({ loading: true });
		this.disponibilidadesService.then((value) => {
			this.setState({
                servicos: value.data.data,
                loading: false
			})
		}).catch((error) => {
			console.log("Api call error --> ", error);
		});
	}

    render() {
        return (
            <div className="servicosDisponiveis">
                <div className="txtTitleServicos">Conheça os nossos serviços em destaque</div>
                <div className="containerServicos">
                    {this.state.loading
                        ? <LoaderMy className="loaderServicos" />
                        : this.state.servicos.map(dt => {
                        return <Servicos 
                            key={dt.id}
                            servico={dt.servico}
                            imagem={dt.imagem}
                            preco={dt.preco}
                            salao={dt.salao}
                            local={dt.local}
                            entrar={this.props.entrar}
                        />
                    })}
                </div>
            </div>     
        )
    }
}