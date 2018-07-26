import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './Login.css';

class Login extends Component {

    onSubmit = (values) => {
        console.log(values);
    }

    render() {
        return (
            <div className="containerLogin">
                <div className="lblLogin">Login</div>
                <Form
                    onSubmit={this.onSubmit}
                    className="renderForm"
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="fieldInput">
                                <Field
                                    name="username"
                                    component="input"
                                    type="text"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div className="fieldInput">
                                <Field
                                    name="password"
                                    component="input"
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <Router>
                                <Route path="/home" component={this.props.home} />
                            </Router>
                            <div className="buttons">
                                <Link to="/home">
                                    <button type="submit" disabled={submitting || pristine}>Sign in</button>
                                </Link>
                            </div>
                        </form>
                    )}
                />
            </div>
        );
    }
}

export default Login;
