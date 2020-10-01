import React, { Component } from "react";
import { CategoryNavigation } from "./CategoryNavigation";
import { ProductList } from "./ProductList";
import { CartSummary } from "./CartSummary";
import { ProductPageConnector } from "./ProductPageConnector";
import { PaginationControls } from "../PaginationControls";

const ProductPages = ProductPageConnector(PaginationControls);

export class Shop extends Component {

    handleAddToCart = (...args) => {
        this.props.addToCart(...args);
        this.props.history.push("/shop/cart");
    };

    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col bg-dark text-white">
                    <div className="navbar-brand">BOOKS STORE</div>
                    <CartSummary {...this.props} />
                </div>
            </div>
            <div className="row">
                <div className="col-3 p-2">
                    <CategoryNavigation categories={this.props.categories}
                    baseUrl="/shop/products" />
                </div>
                <div className="col-9 p-2">
                    <ProductPages />
                    <ProductList products={this.props.products}
                    addToCart={this.handleAddToCart} />
                    <ProductPages />
                </div>
            </div>
        </div>
    }
}