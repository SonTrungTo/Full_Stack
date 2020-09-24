import React, { Component } from "react";
import { DataTypes } from "./Types";

export class DataGetter extends Component {

    render() {
        return <React.Fragment>{this.props.children}</React.Fragment>
    }

    componentDidMount = () => this.getData();
    componentDidUpdate = () => this.getData();

    getData = () => {
        const dsData = this.props.products_params || {};
        const rtData = {
            _page: this.props.match.params.page || 1,
            category_like: this.props.match.params.category === "all" 
                ? "" : (this.props.match.params.category || "" ),
            _sort: this.props.sortKey || "name",
            _limit: this.props.pageSize || 5
        };

        if (Object.keys(rtData).find(key => dsData[key] !== rtData[key])) {
            this.props.loadData(DataTypes.PRODUCTS, rtData);
        }
    }
}