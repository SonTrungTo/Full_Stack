import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { GraphQlUrl } from "../data/Urls";
import { OrdersConnector } from "./OrdersConnector";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToggleLink } from "../ToggleLink";
import { ProductsConnector } from "./ProductsConnector";
import { ProductCreator } from "./ProductCreator";
import { ProductEditor } from "./ProductEditor";
import { AuthWrapper } from "../auth/AuthWrapper";
import { AuthPrompt } from "../auth/AuthPrompt";

export default AuthWrapper(class extends Component {

    constructor(props) {
        super(props);
        this.client = new ApolloClient({
            uri: GraphQlUrl,
            request: gqloperation => gqloperation.setContext({
                headers: {
                    Authorization: `Bearer<${this.props.webToken}>`
                }
            })
        });
    }

    render = () =>
        <ApolloProvider client={this.client}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-info text-white">
                        <div className="navbar-brand">BOOKS STORE</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 p-2">
                        <ToggleLink to="/admin/orders">Orders</ToggleLink>
                        <ToggleLink to="/admin/products">Products</ToggleLink>
                        { this.props.isAuthenticated &&
                        <button className=
                        "btn btn-secondary btn-block col-3 m-2 fixed-bottom"
                        onClick={ this.props.signout }>
                            Logout
                        </button>
                        }
                    </div>
                    <div className="col-9 p-2">
                        <Switch>
                            { !this.props.isAuthenticated &&
                            <Route component={ AuthPrompt } />
                            }
                            <Route path="/admin/orders"
                            component={OrdersConnector} />
                            <Route path="/admin/products/create"
                            component={ProductCreator} />
                            <Route path="/admin/products/:id"
                            component={ProductEditor} />
                            <Route path="/admin/products"
                            component={ProductsConnector} />
                            <Redirect to="/admin/orders" />
                        </Switch>
                    </div>
                </div>
            </div>
        </ApolloProvider>
});