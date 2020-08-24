import React, {Component} from "react";
//import PropTypes from "prop-types";

export class SimpleButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //counter: 0,
            hasButtonBeenClicked: false
        };
    }

    render() {
        return(
            <button className={this.props.className} 
            onClick={this.handleClick} 
            disabled={ this.props.disabled === "true" || this.props.disabled === true} >
                {this.props.text} {this.props.counter}
                {this.state.hasButtonBeenClicked &&
                <div>
                    Button clicked!
                </div>
                }
            </button>
        );
    }

    /* We need to handle state data modification. Write it below.... */
    handleClick = () => {
        this.props.incrementCallback(5);
        this.setState({
            //counter: this.state.counter + 1,
            hasButtonBeenClicked: true
        });
        this.props.callback();
    };

    /* Sequential updates
    handleClick = () => {
        this.setState({counter: this.state.counter + 1},
            () => this.setState({hasButtonBeenClicked: this.state.counter > 0})
        );
        this.props.callback();
    };
    */

    /* Multiple updates in setState
    handleClick = () => {
        for (let i = 0; i < 5; i++) {
            this.setState((state, props) => {return {counter: state.counter + 1}});
        }
        this.setState({hasButtonBeenClicked: true});
        this.props.callback();
    }; 
    */
}


/* SimpleButton.defaultProps = {
    disabled: false
};

SimpleButton.propTypes = {
    text:      PropTypes.string,
    theme:     PropTypes.string,
    callback:  PropTypes.func,
    disabled:  PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}; */