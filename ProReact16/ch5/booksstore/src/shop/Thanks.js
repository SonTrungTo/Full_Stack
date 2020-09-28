import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Thanks extends Component {
    render() {
        return <div className="container-fluid">
            <div className="col bg-dark text-white">
                <div className="navbar-brand">
                    BOOKS STORE
                </div>
            </div>
            <div className="text-center m-2">
                <h2>Thank you!</h2>
                <p>Your order, #{this.props.order ? this.props.order.id : 0},
                is received!</p>
                <p>We will ship your goods as soon as possible.</p>
                <Link to="/shop" className="btn btn-primary">
                    Return To Store
                </Link>
            </div>            
        </div>
    }
}