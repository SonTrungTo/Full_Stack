import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadData } from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { Shop } from "./Shop";
import { addToCart, updateCartQuantity,
removeFromCart, clearCart } from "../data/CartActionCreators";
import { CartDetails } from "./CartDetails";

const mapStateToProps = (storeData) => ({
    ...storeData
});

const mapDispatchToProps = {
    loadData, addToCart, updateCartQuantity, removeFromCart, clearCart
};

const filterProducts = (products = [], category) => 
    (!category || category === "All")
    ? products :
    products.filter(p => p.category.toLowerCase() === category.toLowerCase());

export const ShopConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends Component {
        render() {
            return <Switch>
                <Route path="/shop/products/:category?"
                render={(renderProps) => 
                    <Shop {...this.props} {...renderProps}
                    products={filterProducts(this.props.products,
                    renderProps.match.params.category)} />} />
                <Route path="/shop/cart"
                render={(renderProps) =>
                    <CartDetails {...this.props} {...renderProps} />} />
                <Redirect to="/shop/products" />
            </Switch>
        }

        componentDidMount() {
            this.props.loadData(DataTypes.CATEGORIES);
            this.props.loadData(DataTypes.PRODUCTS);       
        }
    }
)