import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './CadastroEstabelecimento.css';

import formatString from "format-string-by-pattern";
import { Form, Field } from 'react-final-form';
import { AutenticacaoService } from '../../services/autenticacaoService';

const masks = [
    { name: "telefone", placeholder: "Telefone", parse: "(99) 9999-9999", type: "numeric" },
];

const maskCep = [
    { name: "cep", placeholder: "Cep", parse: "99.999-999", type: "numeric" }
];

export default class CadastroEstabelecimento extends Component {

    constructor(props){
        super(props);
        this.state = {
            cadastro: true,
        }

        this.autenticacaoService = new AutenticacaoService();
    }

    onSubmit = (value) => {
        let debito = false;
        let credito = false;
        let estacionamento = false;
        if (value.debito) debito = true; 
        if (value.credito) credito = true; 
        if (value.estacionamento) estacionamento = true; 

        this.autenticacaoService.registerEstablishment({
            nome: value.nome, 
            email: value.email, 
            telefone: value.telefone, 
            horarioFuncionamento: value.horario, 
            cep: value.cep, 
            logradouro: value.logradouro, 
            numero: value.numero, 
            bairro: value.bairro, 
            cidade: value.cidade, 
            estado: value.estado,
            complemento: value.complemento, 
            credito: credito, 
            debito: debito,
            estacionamento: estacionamento
        }).then((value) => {
            console.log("success")
            this.setState({ cadastro: false });
        }).catch((error) => {
            console.log("Api call error --> ", error);
        });
    }

    render() {
        return (
            <div className="cadastroEstabelecimento">
                <div className="backBlackCadastroEstabelecimento"></div>
                {this.state.cadastro
                    ? <div className="boxCadastroEstabelecimento">
                        <div className="titleBoxCadastroEstabelecimento">Cadastre seu estabelecimento e atraia mais clientes a você</div>

                        <Form
                            onSubmit={this.onSubmit}
                            className="renderForm"
                            render={({ handleSubmit, form, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="divEstabelecimento">
                                        <div className="tituloField">Dados</div>
                                        <div className="flexCampos">                                 
                                            <div className="divInput">
                                                <Field
                                                    name="nome"
                                                    component="input"
                                                    type="text"
                                                    placeholder="Nome do Estabelecimento"
                                                    required
                                                    className="input" 
                                                />
                                            </div>
                                            <div className="divInput">
                                                <Field
                                                    name="email"
                                                    component="input"
                                                    type="text"
                                                    placeholder="E-mail"
                                                    required
                                                    className="input" 
                                                />
                                            </div>
                                            {masks.map(mask => (
                                                <div key={mask.name} className="divInput">
                                                    <Field
                                                        component="input"
                                                        name={mask.name}
                                                        parse={formatString(mask.parse)}
                                                        placeholder={mask.placeholder}
                                                        required
                                                        type={mask.type}
                                                        className="input" 
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="divInput">
                                            <Field
                                                name="horario"
                                                component="textarea"
                                                placeholder="Informe os dias e horário de funcionamento como quiser"
                                                required
                                                className="input inputArea" 
                                            />
                                        </div>
                                    </div>

                                    <div className="divEstabelecimento">
                                        <div className="tituloField">Endereço</div>
                                        <div className="flexCampos">                                 
                                            {maskCep.map(mask => (
                                                <div key={mask.name} className="divInput inputWidth">
                                                    <Field
                                                        component="input"
                                                        name={mask.name}
                                                        parse={formatString(mask.parse)}
                                                        placeholder={mask.placeholder}
                                                        required
                                                        type={mask.type}
                                                        className="input" 
                                                    />
                                                </div>
                                            ))}
                                            <div className="divInput">
                                                <Field
                                                    name="logradouro"
                                                    component="input"
                                                    type="text"
                                                    placeholder="Logradouro"
                                                    required
                                                    className="input" 
                                                />
                                            </div>
                                            <div className="divInput inputWidth">
                                                <Field
                                                    name="numero"
                                                    component="input"
                                                    type="number"
                                                    placeholder="Número"
                                                    required
                                                    className="input" 
                                                />
                                            </div>
                                        </div>
                                        <div className="flexCampos">                                 
                                            <div className="divInput">
                                                <Field
                                                    name="bairro"
                                                    component="input"
                                                    type="text"
                                                    placeholder="Bairro"
                                                    required
                                                    className="input" 
                                                />
                                            </div>
                                            <div className="divInput">
                                                <Field
                                                    name="cidade"
                                                    component="input"
                                                    type="text"
                                                    placeholder="Cidade"
                                                    required
                                                    className="input" 
                                                />
                                            </div>
                                            <div className="divInput">
                                                <Field
                                                    name="estado"
                                                    component="input"
                                                    type="text"
                                                    placeholder="Estado"
                                                    required
                                                    className="input" 
                                                />
                                            </div>
                                        </div>
                                        <div className="divInput inputComplemento">
                                            <Field
                                                name="complemento"
                                                component="input"
                                                type="text"
                                                placeholder="Complemento (opcional)"
                                                required={false}
                                                className="input" 
                                            />
                                        </div>
                                    </div>

                                    <div className="divEstabelecimento">
                                        <div className="tituloField">Facilidades</div>
                                        <div className="flexCampos">
                                            <div className="checkInput">
                                                <Field
                                                    name="debito"
                                                    component="input"
                                                    type="checkbox"
                                                    value="debito"
                                                    className="checkboxInput"
                                                />
                                                <div className="checkTxt">Débito</div>
                                            </div>
                                            <div className="checkInput">
                                                <Field
                                                    name="credito"
                                                    component="input"
                                                    type="checkbox"
                                                    value="credito"
                                                    className="checkboxInput"
                                                />
                                                <div className="checkTxt">Crédito</div>
                                            </div>
                                            <div className="checkInput">
                                                <Field
                                                    name="estacionamento"
                                                    component="input"
                                                    type="checkbox"
                                                    value="estacionamento"
                                                    className="checkboxInput"
                                                />
                                                <div className="checkTxt">Estacionamento</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="footerButtons">
                                        <Link to="/hairshop">
                                            <button className="btn btnCadastrar">Voltar</button>
                                        </Link>
                                        <button className="btn btnEntrar" type="submit" disabled={submitting || pristine}>Cadastrar</button>
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                :   <div className="boxCadastrado">
                        <div className="titleBoxCadastroEstabelecimento">Estabelecimento cadastrado com sucesso!</div>
                        <Router>
                            <Route path="/hairshop" component={this.props.goToHomeDeslogada} />
                        </Router>
                        <div className="footerButtonBack">
                            <Link to="/hairshop">
                                <button className="btn btnCadastrar">Voltar</button>
                            </Link>
                        </div>
                    </div>
            }
            </div>     
        )
    }
}
