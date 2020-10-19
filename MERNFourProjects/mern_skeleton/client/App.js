import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import MainRouter from "./MainRouter";
import { hot } from "react-hot-loader";

const App = () => {
    return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <MainRouter />
        </ThemeProvider>
    </BrowserRouter>
    );
}

export default hot(module)(App);