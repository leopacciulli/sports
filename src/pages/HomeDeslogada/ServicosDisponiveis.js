import React, { Component } from 'react'
import './ServicosDisponiveis.css';
import Servicos from '../../components/Servicos/Servicos';
import { DisponibilidadesService } from '../../services/disponibilidadesService';

export default class ServicosDisponiveis extends Component {

    constructor(props){
        super(props);
        this.state = {
            servicos: []
        }

        this.disponibilidadesService = new DisponibilidadesService();
    }

    componentDidMount() {
        this.getServices();
        
	}

	getServices = () => {
		this.disponibilidadesService.then((value) => {
			this.setState({
				servicos: value.data.data
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
                    {this.state.servicos.map(dt => {
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