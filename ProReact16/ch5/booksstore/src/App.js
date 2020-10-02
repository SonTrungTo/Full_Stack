import React, { Component } from "react";
import { BrowserRouter as Router, Switch,
Route, Redirect } from "react-router-dom";
import { ShopConnector } from "./shop/ShopConnector";
import { BooksStoreDataStore } from "./data/DataStore";
import { Provider } from "react-redux";
import { Admin } from "./admin/Admin";

export default class App extends Component {
  render() {
    return <Provider store={BooksStoreDataStore}>
      <Router>
        <Switch>
          <Route path="/shop" component={ShopConnector} />
          <Route path="/admin" component={Admin} />
          <Redirect to="/shop" />
        </Switch>
      </Router>
    </Provider>
  }
}