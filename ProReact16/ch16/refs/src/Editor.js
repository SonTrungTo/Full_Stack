import React, { Component } from "react";

export class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "",
            price: ""
        };
    }

    handleChange = (event) => {
        event.persist();
        this.setState(state => state[event.target.name] = event.target.value);
    };

    handleAdd = () => {
        this.props.callback(this.state);
        this.setState({
            name: "",
            category: "",
            price: ""
        });
    };

    render() {
        return <React.Fragment>
            <div className="form-group p-2">
                <label>Name</label>
                <input className="form-control" name="name"
                value={this.state.name} onChange={this.handleChange}
                autoFocus={true} />
            </div>
            <div className="form-group p-2">
                <label>Category</label>
            </div>
        </React.Fragment>
    }
}