import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Form, Field } from 'react-final-form';
import formatString from "format-string-by-pattern";
import './EditRegistration.css';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const masks = [
    { name: "phone", placeholder: "Phone", parse: "(99) 99999-9999" },
    { name: "cpf", placeholder: "CPF", parse: "999.999.999-99" },
    { name: "date", placeholder: "Date of Birth", parse: "99/99/9999" }
];

class EditRegistration extends React.Component {

    onSubmit = (values) => {
        this.props.valuesSaved(values);
    }

    render() {
        let dt = this.props.datas;
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    className="dialogEdit"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Edit your Registration"}</DialogTitle>
                    <Form
                        onSubmit={this.onSubmit}
                        initialValues={{ name: dt.name, city: dt.city, phone: dt.phone, cpf: dt.cpf, date: dt.date, miles: dt.miles }}
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
                                    <div key={mask.name}  className="fieldInput">
                                        <Field
                                            component="input"
                                            name={mask.name}
                                            parse={formatString(mask.parse)}
                                            placeholder={mask.placeholder}
                                            required
                                        />
                                    </div>
                                ))}
                                {this.props.page === "cyclism" &&
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
                                }
                                {this.props.page === "running" &&
                                    <div className="fieldRadio">
                                        <div className="choose">Choose running miles</div>
                                        <div className="fieldRadio">
                                            <Field
                                                name="miles"
                                                component="input"
                                                type="radio"
                                                value="10 Km"
                                                required
                                            />{' '}
                                            10 Km
                                        </div>
                                        <div className="fieldRadio">
                                            <Field
                                                name="miles"
                                                component="input"
                                                type="radio"
                                                value="20 Km"
                                            />{' '}
                                            20 Km
                                        </div>
                                        <div className="fieldRadio">
                                            <Field
                                                name="miles"
                                                component="input"
                                                type="radio"
                                                value="25 Km"
                                            />{' '}
                                            25 Km
                                        </div>
                                    </div>
                                }
                                {this.props.page === "swimming" &&
                                    <div className="fieldRadio">
                                        <div className="choose">Choose swimming miles</div>
                                        <div className="fieldRadio">
                                            <Field
                                                name="miles"
                                                component="input"
                                                type="radio"
                                                value="1 Km"
                                                required
                                            />{' '}
                                            1 Km
                                        </div>
                                        <div className="fieldRadio">
                                            <Field
                                                name="miles"
                                                component="input"
                                                type="radio"
                                                value="3 Km"
                                            />{' '}
                                            3 Km
                                        </div>
                                        <div className="fieldRadio">
                                            <Field
                                                name="miles"
                                                component="input"
                                                type="radio"
                                                value="5 Km"
                                            />{' '}
                                            5 Km
                                        </div>
                                    </div>
                                }
                                <div className="buttons">
                                    <button type="submit" disabled={submitting || pristine}>Edit</button>
                                    <button type="button" onClick={this.props.handleClose}>Cancel</button>
                                </div>
                            </form>
                        )}
                    />
                </Dialog>
            </div>
        );
    }
}

export default EditRegistration;