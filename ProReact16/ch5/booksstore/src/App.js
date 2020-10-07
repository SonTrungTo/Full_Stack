import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch,
Route, Redirect } from "react-router-dom";
import { ShopConnector } from "./shop/ShopConnector";
import { BooksStoreDataStore } from "./data/DataStore";
import { Provider } from "react-redux";
//import { Admin } from "./admin/Admin";
import { AuthProviderImpl } from "./auth/AuthProviderImpl";

const Admin = lazy(() => import("./admin/Admin"));

export default class App extends Component {
  render() {
    return <Provider store={BooksStoreDataStore}>
      <AuthProviderImpl>
        <Router>
          <Switch>
            <Route path="/shop" component={ShopConnector} />
            <Route path="/admin" render={
              routeProps =>
                <Suspense fallback={ <h3>Loading...</h3> }>
                  <Admin {...routeProps} />
                </Suspense>
            } />
            <Redirect to="/shop" />
          </Switch>
        </Router>
      </AuthProviderImpl>
    </Provider>
  }
}