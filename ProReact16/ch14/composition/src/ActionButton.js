import React, { Component } from "react";

export class ActionButton extends Component {

    render() {
        return (
            <button className={this.getClasses(this.props.proMode)}
                    disabled={!this.props.proMode}
                    onClick={this.props.callback}>
                {this.props.text}
            </button>
        );
    }

    getClasses(proMode) {
        let col = proMode ? this.props.theme : "danger";
        return `btn btn-${col} m-2`;
    }
}