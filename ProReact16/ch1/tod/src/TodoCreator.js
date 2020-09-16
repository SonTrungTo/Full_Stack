import React, { Component } from "react";

export class TodoCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {nextItemText: ""};
    }

    updateNewTextValue = (event) => {
        this.setState({nextItemText: event.target.value});
    };

    createNewTodo = () => {
        this.props.callback(this.state.nextItemText);
        this.setState({nextItemText: ""});
    };

    render = () =>
        <div className="my-1">
            <input className="form-control"
            value={this.state.nextItemText}
            onChange={this.updateNewTextValue} />
            <button className="btn btn-primary mt-1"
            onClick={this.createNewTodo}>
                Add
            </button>
        </div>

}