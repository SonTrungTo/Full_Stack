import React, { Component } from "react";

export class ProductList extends Component {

    render() {
        if (this.props.products === undefined || this.props.products.length === 0) {
            return <h5 className="p-2">No Products</h5>
        }
        return this.props.products.map(product =>
            <div className="card p-1 m-1 bg-light" key={product.id}>
                <div className="card-body">
                    <h4 className="card-title">
                        {product.name}
                        <span className="badge badge-pill badge-primary float-right">
                            <span>&#8364;</span>{product.price.toFixed(2)}
                        </span>
                    </h4>
                    <h6 className="card-subtitle">{product.author}</h6>
                    <div className="card-text bg-white p-1">
                        {product.description}
                        <button className="btn btn-success btn-sm float-right"
                        onClick={ () => this.props.addToCart(product) }>
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}