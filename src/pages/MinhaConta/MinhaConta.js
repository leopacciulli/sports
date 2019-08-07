import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import formatString from "format-string-by-pattern";
import { Form, Field } from 'react-final-form';

import './MinhaConta.css';
import AppBarLogged from '../../components/AppBarLogged/AppBarLogged';

const masks = [
    { name: "telefone", placeholder: "Telefone", parse: "(99) 99999-9999", type: "numeric" }
];

export default class MinhaConta extends Component {

    constructor(props){
        super(props);
        this.state = {
            editando: false,
            senhasDiferentes: false,
            user: {}
        }
    }

    componentDidMount() {
        const user = localStorage.getItem("user");
        this.setState({ user: JSON.parse(user) })
    }

    editarDados = () => {
        this.setState({ editando: !this.state.editando })
    }

    onSubmit = (value) => {
        console.log("CONF", value)
        // this.autenticacaoService.registerUser({
        //     nome: value.nome, 
        //     email: value.email, 
        //     telefone: value.telefone, 
        //     senha: value.senha
        // }).then((value) => {
        //     console.log("success")
        // }).catch((error) => {
        //     console.log("Api call error --> ", error);
        // });
    }


    render() {
        console.log("STATE", this.state)
        return (
            <div>
                <AppBarLogged
                    userName={this.state.user.nome}
                />
                
                <div className="minhaContaPage">
                    <div className="backBlackMinhaConta"></div>
                    {this.state.editando
                        ? <div className="boxMinhaConta">
                                <div className="titleBoxMinhaConta">Meus Dados</div>
                                <Form
                                    onSubmit={this.onSubmit}
                                    initialValues={{
                                        nome: this.state.user.nome,
                                        email: this.state.user.email,
                                        telefone: this.state.user.telefone
                                    }}
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
                                            <div className="footerButtons">
                                                <button onClick={this.editarDados} className="btn btnCadastrar">Cancelar</button>
                                                <button className="btn btnEntrar" type="submit">Confirmar</button>
                                            </div>
                                        </form>
                                    )}
                                />
                            </div>
                        : <div className="boxMinhaConta">
                                <div className="titleBoxMinhaConta">Meus Dados</div>

                                <div className="infoUsuario">Nome: {this.state.user.nome}</div>

                                <div className="infoUsuario">E-mail: {this.state.user.email}</div>

                                <div className="infoUsuario">Telefone: {this.state.user.telefone}</div>

                                <div className="footerButtons">
                                    <Link to="/home">
                                        <button className="btn btnCadastrar">Voltar</button>
                                    </Link>
                                    <button onClick={this.editarDados} className="btn btnEntrar">Editar</button>
                                </div>
                            </div>
                    }
                </div>  
            </div>
        )
    }
}
