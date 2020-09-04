import React, { Component } from "react";

export class Display extends Component {
    formatValue = (data) => Array.isArray(data) ?
        data.join(", ") : data.toString();
    
    render() {
        let keys = Object.keys(this.props.data);
        if (keys.length === 0) {
            return (
                <div className="h5 bg-secondary text-white p-2">
                    No Data
                </div>
            );
        } else {
            return (
                <div className="container-fluid bg-secondary p-2">
                    {keys.map(key => 
                        <div key={key} className="h5 row text-white">
                            <div className="col">{key}:</div>
                            <div className="col">
                                {this.formatValue(this.props.data[key])}
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    }
}