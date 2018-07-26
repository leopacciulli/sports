import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cycling from '../../images/bike.png';

import Participants from '../../components/Participants/Participants';
import data from '../../components/Participants/DataCyclism';
import CancelRegistration from '../../components/CancelRegistration/CancelRegistration';
import EditRegistration from '../../components/EditRegistration/EditRegistration';
import back from '../../images/back.png';
import formatString from "format-string-by-pattern";

import { Form, Field } from 'react-final-form';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './Cyclism.css';

const masks = [
    { name: "phone", placeholder: "Phone", parse: "(99) 99999-9999" },
    { name: "cpf", placeholder: "CPF", parse: "999.999.999-99" },
    { name: "date", placeholder: "Date of Birth", parse: "99/99/9999" }
];

class Cyclism extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registered: false,
            openCancel: false,
            openEdit: false,
            register: []
        }
    }

    componentDidMount = () => {
        if (data.length === 5) {
            this.setState({ registered: true })
        }
    }

    handleClose = () => {
        this.setState({ openCancel: false, openEdit: false });
    };

    handleConfirm = () => {
        data.splice(-1, 1)
        this.setState({ openCancel: false, registered: false });
    };

    onSubmit = (values) => {
        data.push(values)
        this.setState({ registered: true, register: values })
    }

    cancel = () => {
        this.setState({ openCancel: true })
    }

    edit = () => {
        this.setState({ openEdit: true })
    }

    valuesSaved = (newValues) => {
        let dt = data.slice(-1)[0];
        dt.name = newValues.name;
        dt.city = newValues.city;
        dt.date = newValues.date;
        dt.phone = newValues.phone;
        dt.cpf = newValues.cpf;
        dt.miles = newValues.miles;
        this.setState({ registered: true, openEdit: false });
    }

    render() {
        return (
            <div className="cyclismPage">
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        About Cyclism
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <img src={cycling} className="cyclismImgPage" alt="imageNotFound" />
                        <div>
                            <div>The history of cycling dates back to the nineteenth century, ie from 1890. This should be done throughout the nineteenth century.
                            With the advent, they began the races as bigger, as the races, they leave increasingly lighter and less expensive.</div>
                            <div>The browser was of English origin, but early on as major proofs were emerging in France, since the standards were incorporated into the terrain to carry them out.</div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <div className="containerForm">
                    {this.state.registered === false
                        ?
                        <div className="divForm">
                            <div className="lblCadastre">Register</div>
                            <Form
                                onSubmit={this.onSubmit}
                                className="renderForm"
                                render={({ handleSubmit, form, submitting, pristine, values }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="fieldInput">
                                            <Field
                                                name="name"
                                                component="input"
                                                type="text"
                                                placeholder="Name"
                                                required
                                            />
                                        </div>
                                        <div className="fieldInput">
                                            <Field
                                                name="city"
                                                component="input"
                                                type="text"
                                                placeholder="City"
                                                required
                                            />
                                        </div>
                                        {masks.map(mask => (
                                            <div key={mask.name} className="fieldInput">
                                                <Field
                                                    component="input"
                                                    name={mask.name}
                                                    parse={formatString(mask.parse)}
                                                    placeholder={mask.placeholder}
                                                    required
                                                />
                                            </div>
                                        ))}
                                        <div className="fieldRadio">
                                            <div className="choose">Choose cycling miles</div>
                                            <div className="fieldRadio">
                                                <Field
                                                    name="miles"
                                                    component="input"
                                                    type="radio"
                                                    value="5 Km"
                                                    required
                                                />{' '}
                                                5 Km
                                            </div>
                                            <div className="fieldRadio">
                                                <Field
                                                    name="miles"
                                                    component="input"
                                                    type="radio"
                                                    value="10 Km"
                                                />{' '}
                                                10 Km
                                            </div>
                                            <div className="fieldRadio">
                                                <Field
                                                    name="miles"
                                                    component="input"
                                                    type="radio"
                                                    value="15 Km"
                                                />{' '}
                                                15 Km
                                            </div>
                                        </div>
                                        <div className="buttons">
                                            <button type="submit" disabled={submitting || pristine}>Register</button>
                                            <button type="button" onClick={form.reset} disabled={submitting || pristine}>Reset</button>
                                        </div>
                                    </form>
                                )}
                            />

                        </div>
                        : <div className="divRegistered">
                            <div className="success">Successful registration</div>
                            <div className="buttonsRegistered">
                                <button type="button" onClick={this.edit}>Edit Registration</button>
                                <EditRegistration
                                    handleClose={this.handleClose}
                                    open={this.state.openEdit}
                                    datas={this.state.register}
                                    valuesSaved={this.valuesSaved}
                                    page="cyclism"
                                />
                                <button type="button" onClick={this.cancel}>Cancel Registration</button>
                                <CancelRegistration
                                    handleClose={this.handleClose}
                                    handleConfirm={this.handleConfirm}
                                    open={this.state.openCancel}
                                />
                            </div>
                        </div>
                    }
                    <Router>
                        <Route path="/home" component={this.props.home} />
                    </Router>
                    <div className="backHome">
                        <Link to="/home">
                            <div className="back">
                                <div className="titleBack">Back</div>
                                <img src={back} className="imgBack" alt="imageNotFound" />
                            </div>
                        </Link>
                    </div>
                </div>

                <Participants
                    data={data}
                />
            </div>
        );
    }
}

export default Cyclism;
