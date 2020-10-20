import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";

const MainRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact={true} path="/" component={ Home } />
            </Switch>
        </div>
    );
};

export default MainRouter;