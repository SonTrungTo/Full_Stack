import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";

const MainRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact={true} path="/" component={ Home } />
                <Route path="/users" component={ Users } />
            </Switch>
        </div>
    );
};

export default MainRouter;