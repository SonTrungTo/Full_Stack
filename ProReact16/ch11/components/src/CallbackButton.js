import React from "react";
import { SimpleButton } from "./SimpleButton";

export function CallbackButton(props) {
    let {theme, ...childProps} = props; /* Remove the theme passed from parent */
    return(
        <SimpleButton className={`btn btn-${props.theme} btn-sm m-1`}
        {...childProps} />
    );
}

CallbackButton.defaultProps = {
    text: "Default Text",
    theme: "warning"
};