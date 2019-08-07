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
import { AgendamentoService } from '../../services/agendamentoService';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import LoaderMy from '../../components/Loader/LoaderMy';
import events from './events.js';
import ReactModal from 'react-modal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Estabelecimento.css';
import Galeria from '../../components/Galeria/Galeria';

const localizer = BigCalendar.momentLocalizer(moment)

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
            loadingAvaliacao: false,
            events: events,
            modalAgendar: false,
            modalCancelarAgendamento: false,
            horarioAgendado: "",
            dataAgendamento: "",
            loadingProfissional: false,
            loadingAgendamento: false,
            idCancelamento: 0,
            start: {},
            end: {}
        }

        this.estabelecimentoService = new EstabelecimentoService();
        this.agendamentoService = new AgendamentoService();
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
            this.setState({ servicos: false, galeria: true, avaliacoes: false, valueAvaliacao: "", profissionalSelecionado: {}, servicoSelecionado: {} })
        }
        if (aba === 3){
            this.setState({ loadingAvaliacao: true });
            this.setState({ servicos: false, galeria: false, avaliacoes: true }, () => {
                let idEstabelecimento = this.state.estabelecimento.id;
                this.estabelecimentoService.getAvaliacoes(idEstabelecimento).then((avaliacao) => {
                    this.setState({ avaliacoesUser: avaliacao.data.data, loadingAvaliacao: false, profissionalSelecionado: {}, servicoSelecionado: {} })
                })
            })
        }
    }

    selecionarTipoServico = (servico) => {
        this.setState({ loadingProfissional: true });
        let idEstabelecimento = this.state.estabelecimento.id;
        this.estabelecimentoService.getProfissionalEstabelecimento(servico.id, idEstabelecimento).then((profissional) => {
            this.setState({ servicoSelecionado: servico, profissionais: profissional.data.data, profissionalSelecionado: {}, loadingProfissional: false })
        })
    }

    selecionarProfissional = (profissional) => {
        this.setState({ loadingAgendamento: true, events: [] });

        let idEstabelecimento = this.state.estabelecimento.id;
        this.agendamentoService.getAgendamento(idEstabelecimento, profissional.id).then((agendamento) => {
            agendamento.data.data.forEach(item => {
                let obj = {
                    id: item.id,
                    start: new Date(item.start),
                    end: new Date(item.end),
                    title: item.cliente
                }
                this.state.events.push(obj);
            });

            this.setState({ 
                profissionalSelecionado: profissional,
                loadingAgendamento: false
            });
        });
    }

    setValueAvaliacao = (event) => {
        this.setState({ valueAvaliacao: event.target.value });
    }

    avaliarEstrelas = (valor) => {
        if (valor !== this.state.qtdeAvaliacao) {
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

    agendarHorario = ({ start, end }) => {
        if (start > new Date()) {
            let data = moment(start).format("DD/MM/YYYY HH:mm")
            this.setState({ dataInicioAgendamento: start, dataFimAgendamento: end, horarioAgendado: data, modalAgendar: true, start, end });
        }
    }

    selecionarMeuAgendamento = (evento) => {
        if (evento.title === this.state.user.nome) {
            this.setState({ modalCancelarAgendamento: true, idCancelamento: evento });
        }
    }

    handleCancelarAgendamento = () => {
        this.agendamentoService.cancelarAgendamento({
            idAgendamento: this.state.idCancelamento.id
        }).then((value) => {
            this.setState((prevState, props) => {
                const events = [...this.state.events]
                const idx = events.indexOf(this.state.idCancelamento)
                events.splice(idx, 1);
                return { events };
            });
            this.setState({ modalCancelarAgendamento: false, idCancelamento: 0 });
        }).catch((error) => {
            console.log("Api call error --> ", error);
        });
    }

    confirmarAgendamento = () => {
        this.agendamentoService.inserirAgendamento({
            idEstabelecimento: this.state.estabelecimento.id, 
            idProfissional: this.state.profissionalSelecionado.id, 
            profissional: this.state.profissionalSelecionado.nome, 
            valor: this.state.profissionalSelecionado.preco, 
            cliente: this.state.user.nome,
            data: this.state.horarioAgendado,
            start: this.state.start,
            end: this.state.end
        }).then((value) => {
            let start = this.state.dataInicioAgendamento;
            let end = this.state.dataFimAgendamento;
            let title = this.state.user.nome;
            let id = value.data.data.insertId;
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        id,
                        start,
                        end,
                        title
                    },
                ],
                modalAgendar: false
            });
        }).catch((error) => {
            console.log("Api call error --> ", error);
        });
    }

    handleCloseModal = () => {
        this.setState({ modalAgendar: false, modalCancelarAgendamento: false });
    }

    renderGaleria = () => {
        let imagens = this.state.estabelecimento.galeria;
        let parseImg = JSON.parse(imagens);
        let img = parseImg.map(img => {
            return <div className="galeriaImagens">
                <img src={img} className="tagImagem" />
            </div>
        });
        return img;
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
                                <div className="txtEscolher">Escolha o tipo de serviço</div>
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
                            {this.state.loadingProfissional
                                    ? <LoaderMy className="loaderCenter" />
                                    : Object.entries(this.state.servicoSelecionado).length > 0 && 
                                    <div className="secao">
                                        <div className="txtEscolher">Escolha o profissional</div>
                                        <div className="listaProfissional">
                                            {this.state.profissionais.map(profissional => {
                                                return <Profissional
                                                    key={profissional.id}
                                                    fotoProfissional={profissional.foto}
                                                    nomeProfissional={profissional.nome}
                                                    precoServico={profissional.preco}
                                                    selecionarProfissional={() => this.selecionarProfissional(profissional)}
                                                    selected={profissional.id === this.state.profissionalSelecionado.id}
                                                />
                                            })}
                                        </div>
                                    </div>
                            }
                            {this.state.loadingAgendamento
                                ? <LoaderMy className="loaderCenter" />
                                : Object.entries(this.state.profissionalSelecionado).length > 0 &&
                                <div className="secao">
                                    <div className="txtEscolher">Escolha a data e hora</div>
                                    <BigCalendar
                                        selectable
                                        localizer={localizer}
                                        events={this.state.events}
                                        defaultView={BigCalendar.Views.WEEK}
                                        // scrollToTime={new Date()}
                                        defaultDate={new Date()}
                                        min={new Date(2000, 10, 0, 8, 0, 0)}
                                        max={new Date(2025, 10, 0, 20, 0, 0)}
                                        onSelectEvent={this.selecionarMeuAgendamento}
                                        onSelectSlot={this.agendarHorario}
                                        views={{ week: true }}
                                        step={60}
                                        timeslots={1}
                                    />
                                </div>
                            }
                        </div>
                    }

                    {this.state.galeria &&
                        <div className="tabSelected imagens">
                            <Galeria 
                                img={this.state.estabelecimento.galeria}
                            />
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

                {this.state.modalAgendar || this.state.modalCancelarAgendamento && <div className="background"></div>}
                <ReactModal 
                    isOpen={this.state.modalAgendar}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <div className="tituloMOdal">Agendar Horário</div>

                    <div className="corpoModal">
                        <div className="itemModal">Serviço: {this.state.servicoSelecionado.tipoServico}</div>
                        <div className="itemModal">Data: {this.state.horarioAgendado}</div>
                        <div className="itemModal">Profissional: {this.state.profissionalSelecionado.nome}</div>
                        <div className="itemModal">Valor: R$ {this.state.profissionalSelecionado.preco && this.state.profissionalSelecionado.preco.toFixed(2)}</div>
                        <div className="itemModal">Cliente: {this.state.user.nome}</div>
                    </div>

                    <div className="btnsModal">
                        <button className="btnModal cancelar" onClick={this.handleCloseModal}>Cancelar</button>
                        <button className="btnModal confirmar" onClick={this.confirmarAgendamento}>Confirmar</button>
                    </div>
                </ReactModal>

                <ReactModal 
                    isOpen={this.state.modalCancelarAgendamento}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="OverlayCancel"
                >
                    <div className="tituloMOdal">Deseja cancelar seu agendamento?</div>

                    <div className="btnsModal">
                        <button className="btnModal cancelar" onClick={this.handleCloseModal}>Não</button>
                        <button className="btnModal confirmar" onClick={this.handleCancelarAgendamento}>Sim</button>
                    </div>
                </ReactModal>
            </div>     
        )
    }
}