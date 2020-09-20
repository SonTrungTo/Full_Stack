import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadData } from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { Shop } from "./Shop";

const mapStateToProps = (storeData) => ({
    ...storeData
});

const mapDispatchToProps = {
    loadData
};

const filterProducts = (products = [], category) => 
    (!category || category === "All")
    ? products :
    products.filter(p => p.category.toLowerCase() === category.toLowerCase());