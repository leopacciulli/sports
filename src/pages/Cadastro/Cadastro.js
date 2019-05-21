import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Cadastro.css';

import formatString from "format-string-by-pattern";
import { Form, Field } from 'react-final-form';
import { AutenticacaoService } from '../../services/autenticacaoService';

const masks = [
    { name: "telefone", placeholder: "Telefone", parse: "(99) 99999-9999", type: "numeric" }
];

export default class Cadastro extends Component {

    constructor(props){
        super(props);
        this.state = {
            cadastro: true,
            senhasDiferentes: false,
            dadosInvalidos: false
        }

        this.autenticacaoService = new AutenticacaoService();
    }

    onSubmit = (value) => {
        if (value.senha !== value.confirmaSenha){
            this.setState({ senhasDiferentes: true })
        } else {
            this.autenticacaoService.registerUser({
                nome: value.nome, 
                email: value.email, 
                telefone: value.telefone, 
                senha: value.senha
            }).then((value) => {
                console.log("success")
            }).catch((error) => {
                console.log("Api call error --> ", error);
            });
            this.setState({ senhasDiferentes: false, cadastro: false });
        }
    }

    login = (value) => {
		this.autenticacaoService.login(value.emailLogin, value.senhaLogin).then((value) => {
			if (value.data.data.length === 0) {
				this.setState({ dadosInvalidos: true })
			} else {
				this.setState({ dadosInvalidos: false })
			}
		}).catch((error) => {
			console.log("Api call error --> ", error);
		});
    }

    render() {
        return (
            <div className="cadastro">
                <div className="backBlackCadastro"></div>
                {this.state.cadastro
                    ? <div className="boxCadastro">
                            <div className="titleBoxCadastro">Seja um cliente Hair Shop e encontre o salão mais próximo a você</div>

                            <Form
                                onSubmit={this.onSubmit}
                                className="renderForm"
                                render={({ handleSubmit, form, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="divInput">
                                            <Field
                                                name="nome"
                                                component="input"
                                                type="text"
                                                placeholder="Nome"
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
                                        <div className="divInput">
                                            <Field
                                                name="senha"
                                                component="input"
                                                type="password"
                                                placeholder="Senha"
                                                required
                                                className="input" 
                                            />
                                        </div>
                                        <div className="divInput">
                                            <Field
                                                name="confirmaSenha"
                                                component="input"
                                                type="password"
                                                placeholder="Confirmar Senha"
                                                required
                                                className="input" 
                                            />
                                        </div>
                                        {this.state.senhasDiferentes && <div className="senhasDiferentes">As senhas estão diferentes</div>}
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
                    : <div className={this.state.cadastro ? "boxCadastro" : "boxCadLogin"}>
                            <div className="titleBoxCadastro">Cadastro realizado com sucesso !</div>

                            <Form
                                onSubmit={this.login}
                                className="renderForm"
                                render={({ handleSubmit, form, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="divInput">
                                            <Field
                                                name="emailLogin"
                                                component="input"
                                                type="text"
                                                placeholder="E-mail"
                                                required
                                                className="input" 
                                            />
                                        </div>
                                        <div className="divInput">
                                            <Field
                                                name="senhaLogin"
                                                component="input"
                                                type="password"
                                                placeholder="Senha"
                                                required
                                                className="input" 
                                            />
                                        </div>
                                        {this.state.dadosInvalidos &&
                                            <div className="senhasDiferentes">Usuário e/ou senha inválidos</div>
                                        }
                                        <Router>
                                            <Route path="/hairshop" component={this.props.goToHomeDeslogada} />
                                        </Router>
                                        <div className="footerButtons">
                                            <Link to="/hairshop">
                                                <button className="btn btnCadastrar">Voltar</button>
                                            </Link>
                                            <button className="btn btnEntrar" type="submit" disabled={submitting || pristine}>Entrar</button>
                                        </div>
                                    </form>
                                )}
                            />
                        </div>
                }
            </div>     
        )
    }
}
