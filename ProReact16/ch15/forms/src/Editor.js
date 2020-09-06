import React, { Component } from "react";
import { FormValidator } from "./FormValidator";
import { ValidationMessage } from "./ValidationMessage";

export class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            flavor: "Vanilla",
            topping: ["Strawberries"],
            book: ["Microeconomic Theory"],
            advisor: ["Andrew Ng"],
            nerd: false,
            email: "",
            order: ""
        };
        this.flavors = ["Chocolate", "Double Chocolate",
    "Tripple Chocolate", "Vanilla"];
        this.toppings = ["Sprinkles", "Fudge Sauce",
    "Strawberries", "Maple Syrup"];
        this.books = ["Microeconomic Theory", "Statistical Inference",
    "Econometrics", "The Bayesian Choice", "Advanced Macroeconomics"];
        this.advisors = ["Andrew Ng", "Michael Jordan", "Jure Leskovec",
    "Pieter Abbeel", "Sergey Levine"];
        this.rules = {
            name:  {required: true, minLength: 3, alpha: true},
            email: {required: true, email: true},
            order: {required: true}
        };
    }

    updateFormValue = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    updateFormValueOptions = (event) => {
        let options = [...event.target.options]
        .filter(o => o.selected).map(o => o.value);

        this.setState({ [event.target.name]: options });
    };

    updateFormValueCheck = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    updateFormValueCheckPopulate = (event) => {
        event.persist();
        this.setState(state => {
            if (event.target.checked) {
                return {advisor: state.advisor.concat(event.target.name)};
            } else {
                return {advisor: state.advisor.filter(adv => adv !== event.target.name)}
            }
        });
    };

    render() {
        return (
            <div className="h5 bg-info text-white p-2">
                <FormValidator data={this.state} rules={this.rules}
                submit={this.props.submit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.updateFormValue} />
                        <ValidationMessage field="name" />
                    </div>
                    <div className="form-group">
                        <label>Ice Cream Flavors</label>
                        <select className="form-control"
                        name="flavor" value={this.state.flavor}
                        onChange={this.updateFormValue}>
                            { this.flavors.map(flavor => 
                                <option key={flavor} value={flavor}>
                                    {flavor}
                                </option>
                            ) }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Ice Cream Topping</label>
                        <select className="form-control"
                        name="topping" value={this.state.topping} multiple={true}
                        onChange={this.updateFormValueOptions}>
                            {this.toppings.map(topping =>
                                <option key={topping} value={topping}>
                                    {topping}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Favorite Book</label>
                        {this.books.map(book => 
                            <div className="form-check" key={book}>
                                <input type="radio" className="form-check-input"
                                name="book" value={book}
                                checked={this.state.book === book}
                                onChange={this.updateFormValue} />
                                <label className="form-check-label">{book}</label>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input"
                            name="nerd" checked={this.state.nerd}
                            onChange={this.updateFormValueCheck} />
                            <label className="form-check-label">I am a nerd!</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Your advisor(s)</label>
                        {this.advisors.map(adv =>
                            <div className="form-check" key={adv}>
                                <input type="checkbox" className="form-check-input"
                                name={adv}
                                checked={this.state.advisor.indexOf(adv) > -1}
                                onChange={this.updateFormValueCheckPopulate} />
                                <label className="form-check-label">{adv}</label>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Order</label>
                        <textarea className="form-control" name="order"
                        value={this.state.order}
                        onChange={this.updateFormValue} />
                    </div>
                </FormValidator>
            </div>
        );
    }
}