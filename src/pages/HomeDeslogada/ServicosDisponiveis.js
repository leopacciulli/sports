import React, { Component } from "react";
import "./ServicosDisponiveis.css";
import Servicos from "../../components/Servicos/Servicos";
import { DisponibilidadesService } from "../../services/disponibilidadesService";
import LoaderMy from "../../components/Loader/LoaderMy";

export default class ServicosDisponiveis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servicos: [
                {
                    id: 5,
                    servico: "Cabelo",
                    imagem: "https://i.ibb.co/pbnRmmV/cabelo.jpg",
                    salao: "Salão Jonas e Márcia",
                    local: "Bragança Paulista - SP",
                    preco: "25,00"
                },
                {
                    id: 6,
                    servico: "Barba",
                    imagem: "https://i.ibb.co/9gmqXf2/barba.jpg",
                    salao: "Beauty Salon",
                    local: "Bragança Paulista - SP",
                    preco: "30,00"
                },
                {
                    id: 7,
                    servico: "Manicure",
                    imagem: "https://i.ibb.co/jMsZkPP/manicure.jpg",
                    salao: "Salão Unisex",
                    local: "Atibaia - SP",
                    preco: "30,00"
                },
                {
                    id: 8,
                    servico: "Sombrancelha",
                    imagem: "https://i.ibb.co/WnzTNVq/sombrancelha.jpg",
                    salao: "Embelleze",
                    local: "São Paulo - SP",
                    preco: "18,00"
                },
                {
                    id: 9,
                    servico: "Combo: Corte + Barba",
                    imagem: "https://i.ibb.co/QcBKB4w/cortebarba.jpg",
                    salao: "Hair Cut",
                    local: "Alphaville - SP",
                    preco: "45,00"
                },
                {
                    id: 10,
                    servico: "Tintura",
                    imagem: "https://i.ibb.co/g6Qsg3H/tintura.jpg",
                    salao: "Salão de Beleza dois irmãos",
                    local: "Barueri - SP",
                    preco: "35,00"
                }
            ],
            loading: false
        };

        this.disponibilidadesService = new DisponibilidadesService();
    }

    componentDidMount() {
        // this.getServices();
    }

    getServices = () => {
        this.setState({ loading: true });
        this.disponibilidadesService
            .then(value => {
                this.setState({
                    servicos: value.data.data,
                    loading: false
                });
            })
            .catch(error => {
                console.log("Api call error --> ", error);
                this.setState({
                    loading: false
                });
            });
    };

    render() {
        return (
            <div className="servicosDisponiveis">
                {this.state.servicos.length === 0 ? (
                    <div></div>
                ) : (
                    <div>
                        <div className="txtTitleServicos">Conheça os nossos serviços em destaque</div>
                        <div className="containerServicos">
                            {this.state.loading ? (
                                <LoaderMy className="loaderServicos" />
                            ) : (
                                this.state.servicos.map(dt => {
                                    return (
                                        <Servicos
                                            key={dt.id}
                                            servico={dt.servico}
                                            imagem={dt.imagem}
                                            preco={dt.preco}
                                            salao={dt.salao}
                                            local={dt.local}
                                            entrar={this.props.entrar}
                                        />
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
