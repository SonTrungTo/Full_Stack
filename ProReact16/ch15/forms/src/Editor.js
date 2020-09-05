import React, { Component } from "react";

export class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Bob",
            flavor: "Vanilla",
            topping: ["Strawberries"],
            book: ["Microeconomic Theory"],
            nerd: false
        };
        this.flavors = ["Chocolate", "Double Chocolate",
    "Tripple Chocolate", "Vanilla"];
        this.toppings = ["Sprinkles", "Fudge Sauce",
    "Strawberries", "Maple Syrup"];
        this.books = ["Microeconomic Theory", "Statistical Inference",
    "Econometrics", "The Bayesian Choice", "Advanced Macroeconomics"];
    }

    updateFormValue = (event) => {
        this.setState({ [event.target.name]: event.target.value },
            () => this.props.submit(this.state) );
    };

    updateFormValueOptions = (event) => {
        let options = [...event.target.options]
        .filter(o => o.selected).map(o => o.value);

        this.setState({ [event.target.name]: options },
            () => this.props.submit(this.state) );
    };

    updateFormValueCheck = (event) => {
        this.setState({ [event.target.name]: event.target.checked },
            () => this.props.submit(this.state) );
    };

    render() {
        return (
            <div className="h5 bg-info text-white p-2">
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.updateFormValue} />
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
            </div>
        );
    }
}