import React, { Component } from "react";
import { Link } from "react-router-dom";

export class CategoryNavigation extends Component {
    render() {
        return <React.Fragment>
            <Link to={ this.props.baseUrl }
            className="btn btn-secondary btn-block">All</Link>
            {this.props.categories && this.props.categories.map(cat => 
                <Link key={cat} className="btn btn-secondary btn-block"
                to={`${this.props.baseUrl}/${cat.toLowerCase()}`}>
                    {cat}
                </Link>
            )}
        </React.Fragment>
    }
}