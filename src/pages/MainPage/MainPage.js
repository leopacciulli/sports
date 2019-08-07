import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeDeslogada from '../HomeDeslogada/HomeDeslogada';

import ServicosDisponiveis from '../HomeDeslogada/ServicosDisponiveis';
import Banner from '../HomeDeslogada/Banner';
import Footer from '../../components/Footer/Footer';
import Cadastro from '../Cadastro/Cadastro';
import CadastroEstabelecimento from '../CadastroEstabelecimento/CadastroEstabelecimento';
import HomeLogada from '../HomeLogada/HomeLogada';
import Estabelecimento from '../Estabelecimento/Estabelecimento';
import MinhaConta from '../MinhaConta/MinhaConta';

//import { loginService } from '../../services/autenticacaoService';

import './MainPage.css';

const MainPage = () => (
    <Router>
        <div>
            <Route exact path="/" component={homeDeslogada} />
            <Route path="/cadastro" component={cadastro} />
            <Route path="/cadastro-estabelecimento" component={cadastroEstabelecimento} />
            <Route path="/hairshop" component={homeDeslogada} />
            <Route path="/home" component={homeLogada} />
            <Route path="/estabelecimento" component={estabelecimento} />
            <Route path="/minha-conta" component={minhaConta}  />
        </div>
    </Router>
)

const homeLogada = () => (
    <div className="homePageLogada">
        <HomeLogada />
        <ServicosDisponiveis 
            entrar={true}
        />
        <Footer />
    </div>
)

const minhaConta = () => (
    <div className="minhaConta">
        <MinhaConta />
    </div>
)

const homeDeslogada = () => (
    <div className="homePageDeslogada">
        <HomeDeslogada />
        <ServicosDisponiveis 
            entrar={false}
        />
        <Banner />
        <Footer />
    </div>
);

const cadastro = () => (
    <div>
        <Cadastro />
    </div>
);

const cadastroEstabelecimento = () => (
    <div>
        <CadastroEstabelecimento />
    </div>
);

const estabelecimento = () => (
    <div>
        <Estabelecimento />
    </div>
);

export default MainPage;