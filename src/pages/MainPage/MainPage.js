import React from 'react';
import AppBarLogged from '../../components/AppBarLogged/AppBarLogged';
import Modality from './Modality';
import cycling from '../../images/bike.png';
import swimmimg from '../../images/swim.png';
import running from '../../images/run.png';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cyclism from '../Cyclism/Cyclism';
import Swimming from '../Swimming/Swimming';
import Running from '../Running/Running';
import Login from '../Login/Login';

import './MainPage.css';

const MainPage = () => (
    <Router>
        <div>
            <Route exact path="/" component={login} />
            <Route path="/home" component={home} />
            <Route path="/cyclism" component={cyclismPage} />
            <Route path="/swimming" component={swimmingPage} />
            <Route path="/running" component={runningPage} />
        </div>
    </Router>
)

const login = () => (
    <div className="loginPage">
        <Login home={home} />
    </div>
);

const home = () => (
    <span>
        <AppBarLogged />
        <div className="mainPage">
            <div className="subHeader">
                <div className="title">Welcome to the 1st marathon event in your city.</div>
                <div className="subTitle">Choose your mode below and detonate.</div>
            </div>

            <div className="modalityContainer">
                <Link to="/swimming">
                    <Modality
                        title="Swimming"
                        img={swimmimg}
                        classImg="imgSwimming"
                    />
                </Link>
                <Link to="/running">
                    <Modality
                        title="Running"
                        img={running}
                        classImg="imgRunning"
                    />
                </Link>
                <Link to="/cyclism">
                    <Modality
                        title="Cycling"
                        img={cycling}
                        classImg="imgCycling"
                    />
                </Link>
            </div>
        </div>
    </span>
);


const cyclismPage = () => (
    <span>
        <AppBarLogged />
        <Cyclism home={home} />
    </span>
);

const swimmingPage = () => (
    <span>
        <AppBarLogged />
        <Swimming home={home} />
    </span>
);

const runningPage = () => (
    <span>
        <AppBarLogged />
        <Running home={home} />
    </span>
);

export default MainPage;
