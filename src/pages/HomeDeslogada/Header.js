import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Form, Field } from 'react-final-form';
import { AutenticacaoService } from '../../services/autenticacaoService';
import './Header.css';

export default class Header extends Component {

	constructor(props){
        super(props);
		this.state = {
			dadosInvalidos: false,
            goToHome: false,
            person: {}
		}
		
		this.autenticacaoService = new AutenticacaoService();
    }

	login = (value) => {
		this.autenticacaoService.login(value.emailLogin, value.senhaLogin).then((value) => {
			console.log(value)
			if (value.data.data.length === 0) {
				this.setState({ dadosInvalidos: true, goToHome: false, person: {} })
			} else {

				this.setState({ dadosInvalidos: false, goToHome: true, person: value.data.data })
			}
		}).catch((error) => {
			console.log("Api call error --> ", error);
		});
    }

	render() {
		//se encontrar usuário registrado vai pra home logada
		if (this.state.goToHome === true) {
            localStorage.setItem('user', JSON.stringify(this.state.person));
			return <Redirect to='/home' />
		}
		  
		return (
			<div className="flexHeader">
				<div className="div1">
					<div className="title1">O salão perfeito para sua beleza!!!</div>
					<div className="title2">Encontre o salão mais próximo a você que atenda todas as suas necessidades.</div>
				</div>
				<div className="div2">
					<div className="boxLogin">
						<div className="titleBox">Cadastre-se e encontre os salões mais próximos a você.</div>

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
									<div className="footerButtons">
										<Link to="/cadastro">
											<button className="btn btnCadastrar">Cadastre-se</button>
										</Link>
										<button className="btn btnEntrar" type="submit" disabled={submitting || pristine}>Entrar</button>
									</div>
								</form>
							)}
						/>
					</div>
				</div>
			</div>             
		)
	}
}