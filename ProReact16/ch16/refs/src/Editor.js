import React, { Component } from "react";

export class Editor extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     name: "",
        //     category: "",
        //     price: ""
        // };
        this.nameRef = React.createRef();
        this.categoryRef = React.createRef();
        this.priceRef = React.createRef();
    }

    // handleChange = (event) => {
    //     event.persist();
    //     this.setState(state => state[event.target.name] = event.target.value);
    // };

    handleAdd = () => {
        this.props.callback({
            name: this.nameRef.current.value,
            category: this.categoryRef.current.value,
            price: this.priceRef.current.value
        });
        this.nameRef.current.value = "";
        this.categoryRef.current.value = "";
        this.priceRef.current.value = "";
        this.nameRef.current.focus();
        // this.setState({
        //     name: "",
        //     category: "",
        //     price: ""
        // }, () => this.nameRef.current.focus() );
    };

    render() {
        return <React.Fragment>
            <div className="form-group p-2">
                <label>Name</label>
                <input className="form-control" name="name"
                autoFocus={true} ref={this.nameRef} defaultValue="Son To" />
            </div>
            <div className="form-group p-2">
                <label>Category</label>
                <input className="form-control" name="category"
                ref={this.categoryRef} />
            </div>
            <div className="form-group p-2">
                <label>Price</label>
                <input className="form-control" name="price"
                ref={this.priceRef} />
            </div>
            <div className="text-center">
                <button className="btn btn-primary" onClick={this.handleAdd}>
                    Add
                </button>
            </div>
        </React.Fragment>
    }
}