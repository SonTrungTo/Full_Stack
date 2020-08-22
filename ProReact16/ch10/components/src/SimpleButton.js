import React from "react";
import PropTypes from "prop-types";

export function SimpleButton(props) {
    return(
        <button className={props.className} 
        onClick={props.callback} 
        disabled={ props.disabled === "true" || props.disabled === true} >
            {props.text}
        </button>
    );
}

SimpleButton.defaultProps = {
    disabled: false
};

SimpleButton.propTypes = {
    text:      PropTypes.string,
    theme:     PropTypes.string,
    callback:  PropTypes.func,
    disabled:  PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};