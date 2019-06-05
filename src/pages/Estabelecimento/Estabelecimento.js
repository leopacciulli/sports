import React, { Component } from 'react'
import AppBarLogged from '../../components/AppBarLogged/AppBarLogged';
import pin from "../../images/icons/pin.png";
import horario from "../../images/icons/horario.png";
import fone from "../../images/icons/fone.png";
import mapa from "../../images/icons/mapa.png";
import card from "../../images/icons/card.png";
import estacionamento from "../../images/icons/estacionamento.png";
import TipoServicoEstabelecimento from '../../components/TipoServicoEstabelecimento/TipoServicoEstabelecimento';
import Profissional from '../../components/Profissional/Profissional';
import Avaliacao from '../../components/Avaliacao/Avaliacao';
import { EstabelecimentoService } from '../../services/estabelecimentoService';
import moment from "moment";
import LoaderMy from '../../components/Loader/LoaderMy';

import './Estabelecimento.css';

export default class Estabelecimento extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: {},
            servicos: true,
            galeria: false,
            avaliacoes: false,
            estabelecimento: {},
            tipoServicos: [],
            profissionais: [],
            servicoSelecionado: {},
            profissionalSelecionado: {},
            avaliacoesUser: [],
            valueAvaliacao: "",
            qtdeAvaliacao: 0,
            loadingAvaliacao: false
        }

        this.estabelecimentoService = new EstabelecimentoService();
    }

    componentDidMount() {
        this.service();
        
    }

    service = () => {
        const user = localStorage.getItem("user");
        const estabelecimento = localStorage.getItem("estabelecimento");
        
        let objEstabelecimento = JSON.parse(estabelecimento)
        this.setState({ user: JSON.parse(user), estabelecimento: objEstabelecimento })

        this.estabelecimentoService.getServicoEstabelecimento(objEstabelecimento.id).then((servicos) => {
            this.setState({ tipoServicos: servicos.data.data })
        })
    }

    mudarAba = (aba) => {
        if (aba === 1){
            this.setState({ servicos: true, galeria: false, avaliacoes: false, valueAvaliacao: "" })
        }
        if (aba === 2){
            this.setState({ servicos: false, galeria: true, avaliacoes: false, valueAvaliacao: "" })
        }
        if (aba === 3){
            this.setState({ loadingAvaliacao: true });
            this.setState({ servicos: false, galeria: false, avaliacoes: true }, () => {
                let idEstabelecimento = this.state.estabelecimento.id;
                this.estabelecimentoService.getAvaliacoes(idEstabelecimento).then((avaliacao) => {
                    this.setState({ avaliacoesUser: avaliacao.data.data, loadingAvaliacao: false })
                })
            })
        }
    }

    selecionarTipoServico = (servico) => {
        let idEstabelecimento = this.state.estabelecimento.id;
        this.estabelecimentoService.getProfissionalEstabelecimento(servico.id, idEstabelecimento).then((profissional) => {
            this.setState({ servicoSelecionado: servico, profissionais: profissional.data.data })
        })
    }

    selecionarProfissional = (profissional) => {
        this.setState({ profissionalSelecionado: profissional });
    }

    setValueAvaliacao = (event) => {
        this.setState({ valueAvaliacao: event.target.value });
    }

    avaliarEstrelas = (valor) => {
        if(valor !== this.state.qtdeAvaliacao) {
            this.setState({ qtdeAvaliacao: valor });
        }
    }

    avaliar = () => {
        this.setState({ loadingAvaliacao: true });
        this.estabelecimentoService.inserirAvaliacao({
            avaliacao: this.state.valueAvaliacao, 
            nomeUsuario: this.state.user.nome, 
            emailUsuario: this.state.user.email, 
            qtdeAvaliacao: this.state.qtdeAvaliacao,
            idEstabelecimento: this.state.estabelecimento.id,
            dataAvaliacao: moment().format("DD/MM/YYYY")
        }).then(() => {
            let idEstabelecimento = this.state.estabelecimento.id;
            this.estabelecimentoService.getAvaliacoes(idEstabelecimento).then((avaliacao) => {
                this.setState({ avaliacoesUser: avaliacao.data.data, qtdeAvaliacao: 0, valueAvaliacao: "", loadingAvaliacao: false })
            });
        }).catch((error) => {
            console.log("Api call error --> ", error);
        });
    }

    abrirMapa = () => {
        var url = "https://maps.google.com/?q=" + this.state.estabelecimento.latitude + "," + this.state.estabelecimento.longitude;
        window.open(url);
    }
    
    render() {
        console.log("pageEST", this.state)
        // let gal = JSON.parse(this.state.estabelecimento.galeria);
        // console.log("GAL", gal)
        let estabelecimento = this.state.estabelecimento;

        return (
            <div>
                <AppBarLogged
                    userName={this.state.user.nome}
                />
                <div className="estabelecimentoPage">
                    <div className="headerSalao">
                        <div className="flexTopo">
                            <div className="nomeSalao">{estabelecimento.nome}</div>
                            <div className="flexMapa">
                                <img src={mapa} className="iconMapa" />
                                <div className="verMapa" onClick={this.abrirMapa}>Ver no mapa</div>
                            </div>
                        </div>

                        <div className="flexBottom">
                            <div className="localSalao">
                                <div className="flexInfo">
                                    <img src={pin} className="iconPin" />
                                    <div className="infoHeaderSalao">{estabelecimento.logradouro}, {estabelecimento.numero} - {estabelecimento.bairro}</div>
                                </div>
                                <div className="flexInfo">
                                    <img src={horario} className="iconHorario" />
                                    <div className="infoHeaderSalao">{estabelecimento.horarioFuncionamento}</div>
                                </div>
                                <div className="flexInfo">
                                    <img src={fone} className="iconFone" />
                                    <div className="infoHeaderSalao">{estabelecimento.telefone}</div>
                                </div>
                            </div>
                            <div className="facilidadesSalao">
                                {estabelecimento.debito === "true" &&   
                                    <div className="flexInfo">
                                        <img src={card} className="iconCard" />
                                        <div className="infoHeaderSalao">Aceita débito</div>
                                    </div>
                                }
                                {estabelecimento.credito === "true" &&   
                                    <div className="flexInfo">
                                        <img src={card} className="iconCard" />
                                        <div className="infoHeaderSalao">Aceita crédito</div>
                                    </div>
                                }
                                {estabelecimento.estacionamento === "true" &&   
                                    <div className="flexInfo">
                                        <img src={estacionamento} className="iconEstacionamento" />
                                        <div className="infoHeaderSalao">Possui estacionamento</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="bodySalao">
                        <div className="tabs">
                            <div onClick={() => this.mudarAba(1)} className={this.state.servicos ? "abaAtiva abaGeral" : "aba abaGeral"}>Serviços</div>
                            <div onClick={() => this.mudarAba(2)} className={this.state.galeria ? "abaAtiva abaGeral" : "aba abaGeral"}>Galeria de Fotos</div>
                            <div onClick={() => this.mudarAba(3)} className={this.state.avaliacoes ? "abaAtiva abaGeral" : "aba abaGeral"}>Avaliações</div>
                        </div>
                    </div>

                    {this.state.servicos &&
                        <div className="tabSelected">
                            <div className="secao">
                                <div className="txtEscolher">Selecione o tipo de serviço</div>
                                <div className="listaProfissional">
                                    {this.state.tipoServicos.map(service => {
                                        return <TipoServicoEstabelecimento
                                            key={service.id}
                                            tipoServico={service.tipoServico}
                                            selecionarTipoServico={() => this.selecionarTipoServico(service)}
                                            servicoSelecionado={this.state.servicoSelecionado.tipoServico}
                                        />
                                    })}
                                </div>
                            </div>
                            <div className="secao">
                                <div className="txtEscolher">Selecione o profissional</div>
                                <div className="listaProfissional">
                                    {this.state.profissionais.map(profissional => {
                                        return <Profissional
                                            key={profissional.id}
                                            fotoProfissional={profissional.foto}
                                            nomeProfissional={profissional.nome}
                                            selecionarProfissional={() => this.selecionarProfissional(profissional)}
                                            selected={profissional.id === this.state.profissionalSelecionado.id}
                                        />
                                    })}
                                </div>
                            </div>
                            <div className="secao">
                                <div className="txtEscolher">Selecione o horário</div>
                                <div>hora</div>
                            </div>
                            <div className="agendar">
                                <button className="btnAgendar">Agendar</button>
                            </div>
                        </div>
                    }

                    {this.state.avaliacoes &&
                        <div className="tabSelected">
                            {this.state.loadingAvaliacao
                                ? <LoaderMy className="loaderAvaliacao" />
                                : <Avaliacao
                                    hasAvaliacao={this.state.avaliacoesUser}
                                    avaliacoesUser={this.state.avaliacoesUser}
                                    valueAvaliacao={this.state.valueAvaliacao}
                                    setValueAvaliacao={this.setValueAvaliacao}
                                    avaliar={this.avaliar}
                                    avaliarEstrelas={this.avaliarEstrelas}
                                    qtdeAvaliacao={this.state.qtdeAvaliacao}
                                />
                            }
                        </div>
                    }

                </div>
            </div>     
        )
    }
}