import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AuthWrapper } from "./AuthWrapper";
import { ValidatedForm } from "../forms/ValidatedForm";

export const AuthPrompt = withRouter(AuthWrapper(
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                errorMessage: null
            };
            this.defaultAttrs = {required: true, type: "text"};
            this.formModel = [
                {label: "Username", attrs: {defaultValue: "admin"}},
                {label: "Password", attrs: {type: "password"}}
            ];
        }

        authenticate = (credentials) => {
            this.props.authenticate(credentials)
                .catch(err => this.setState({ errorMessage: err.message }))
                .then(this.props.history.push("/admin"));
        };

        render = () => 
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-dark text-white">
                        <div className="navbar-brand">BOOKS STORE</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col m-2">
                        { this.state.errorMessage &&
                        <h4 className="bg-danger text-center m-1 p-2">
                            { this.state.errorMessage }
                        </h4>
                        }

                        <ValidatedForm formModel={this.formModel}
                            defaultAttrs={this.defaultAttrs}
                            submitCallback={this.authenticate}
                            cancelCallback={() => this.props.history.push("/")}
                            submitText="Login"
                            cancelText="Cancel" />
                    </div>
                </div>
            </div>
    }
));