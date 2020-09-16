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
        <div>
            
        </div>

}