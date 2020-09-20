import React, { Component } from "react";
import { BrowserRouter as Router, Switch,
Route, Redirect } from "react-router-dom";
import { ShopConnector } from "./shop/ShopConnector";
import { BooksStoreDataStore } from "./data/DataStore";
import { Provider } from "react-redux";

export default class App extends Component {
  render() {
    return <Provider store={BooksStoreDataStore}>
      <Router>
        <Switch>
          <Route path="/shop" component={ShopConnector} />
          <Redirect to="/shop" />
        </Switch>
      </Router>
    </Provider>
  }
}