import React, { Component } from "react";

export class CartDetailsRows extends Component {

    handleChange = (quantity, product, event) => {
        if (quantity >= 1) {
            this.props.updateCartQuantity(product, event.target.value);
        }
    };

    render() {
        if (!this.props.cart || this.props.cart.length === 0) {
            return <tr>
                <td colSpan="5">Your cart is empty</td>
            </tr>
        } else {
            return <React.Fragment>
                {this.props.cart.map(item => 
                    <tr key={item}>
                        <td>
                            <input type="number" value={item.quantity} min="1"
                            onChange={(ev) =>
                            this.handleChange(item.quantity, item.product, ev)} />
                        </td>
                        <td>{item.product.name}</td>
                        <td><span>&#8364;</span>{item.product.price.toFixed(2)}</td>
                        <td><span>&#8364;</span>{(item.product.price * item.quantity).toFixed(2)}</td>
                        <td>
                            <button className="btn btn-danger btn-sm"
                            onClick={() => this.props.removeFromCart(item.product)}>
                                Remove
                            </button>
                        </td>
                    </tr>
                )}
                <tr>
                    <th colSpan="3" className="text-right">Total:</th>
                    <th colSpan="2"><span>&#8364;</span>{this.props.cartPrice.toFixed(2)}</th>
                </tr>
            </React.Fragment>
        }
    }
};