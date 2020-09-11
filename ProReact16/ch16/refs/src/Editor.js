import React, { Component } from "react";
import { GetValidationMessages } from "./ValidationMessage";
import { ValidationDisplay } from "./ValidationDisplay";

export class Editor extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     name: "",
        //     category: "",
        //     price: ""
        // };
        // this.nameRef = React.createRef();
        // this.categoryRef = React.createRef();
        // this.priceRef = React.createRef();
        this.formElements = {
            name: {label: "Name", name: "name",
        validation: {required: true, minLength: 3}},
            category: {label: "Category", name: "category",
        validation: {required: true, minLength: 5}},
            price: {label: "Price", name: "price",
        validation: {type: "number", required: true, min: 5}}
        };
        this.state = {
            errors: {}
        };
    }

    // handleChange = (event) => {
    //     event.persist();
    //     this.setState(state => state[event.target.name] = event.target.value);
    // };

    setElement = (element) => {
        if (element !== null) {
            this.formElements[element.name].element = element; // .element === HTMLElement Object
        }
    };

    handleAdd = () => {
        if (this.validateFormElements()) {
            let data = {};
            Object.values(this.formElements).forEach(v => {
                data[v.element.name] = v.element.value;
                v.element.value = "";
            });
            this.props.callback(data);
            this.formElements.name.element.focus();
        }
        // this.props.callback({
        //     name: this.nameRef.current.value,
        //     category: this.categoryRef.current.value,
        //     price: this.priceRef.current.value
        // });
        // this.nameRef.current.value = "";
        // this.categoryRef.current.value = "";
        // this.priceRef.current.value = "";
        // this.nameRef.current.focus();
        // this.setState({
        //     name: "",
        //     category: "",
        //     price: ""
        // }, () => this.nameRef.current.focus() );
    };

    validateFormElement = (name) => {
        let errors = GetValidationMessages(this.formElements[name].element);
        this.setState(state => state.errors[name] = errors);
        return errors.length === 0;
    };

    validateFormElements = () => {
        let valid = true;
        Object.keys(this.formElements).forEach(name => {
            if (!this.validateFormElement(name)) {
                valid = false;
            }
        });
        return valid;
    };

    render() {
        return <React.Fragment>
            {
                Object.values(this.formElements).map(elem =>
                    <div className="form-group p-2" key={elem.name}>
                        <label>{elem.label}</label>
                        <input className="form-control"
                        name={elem.name}
                        autoFocus={elem.name === "name"}
                        ref={this.setElement}
                        onChange={() => this.validateFormElement(elem.name)}
                        {...elem.validation} />
                        <ValidationDisplay errors={this.state.errors[elem.name]} />
                    </div>
                )
            }
            <div className="text-center">
                <button className="btn btn-primary" onClick={this.handleAdd}>
                    Add
                </button>
            </div>
        </React.Fragment>
    }
}