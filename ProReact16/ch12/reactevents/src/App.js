import React, { Component } from 'react';
import { ThemeButton } from "./ThemeButton";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Ready",
      counter: 0,
      theme: "secondary"
    };
    /* this.handleEvent = this.handleEvent.bind(this); */
  }

/*   handleEvent = (event, newTheme) => {
    event.persist();
    this.setState({
      counter: this.state.counter + 1,
      theme: newTheme
    },
      () => this.setState({message: `${event.type}: ${this.state.counter}`}));
  };

  toggleCheckbox = (event) => {
    if (this.state.counter === 0) {
      event.preventDefault();
    }
  };
*/
/* handleEvent() {
    this.setState({message: "Clicked"});
  }
*/

  selectTheme = (newTheme) => {
    this.setState({
      theme: newTheme,
      message: `Theme: ${newTheme}`
    });
  };

  handleClick = (event) => {
    console.log(`App: Type: ${event.type} `
              + `Target: ${event.target.tagName} `
              + `CurrentTarget: ${event.currentTarget.tagName}`);
  };

  render() { /* To familiarize with Capture Phase, Target Phase and Bubble Phase */
    return(
      <div className="m-2" onClick={this.handleClick}>
{/*     <div className="form-check">
          <input className="form-check-input" type="checkbox"
          onClick={this.toggleCheckbox} />
          <label>This is a checkbox</label>
        </div> */} 
        <div className={`h4 bg-${this.state.theme} text-white text-center p-2`}>
          {this.state.message}
        </div>
        <div className="text-center" onClick={this.handleClick}>
          <ThemeButton theme="primary" callback={this.selectTheme} />
          <ThemeButton theme="danger" callback={this.selectTheme} />
        </div>
      </div>
    );
  }
}