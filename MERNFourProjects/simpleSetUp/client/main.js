import React from "react";
import { render } from "react-dom";
import HelloWorld from "./HelloWorld";

render(
    <React.StrictMode>
        <HelloWorld />
    </React.StrictMode>
, document.getElementById("root"));