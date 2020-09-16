import React, {Component} from 'react';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Son To"
    };
  }

  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Son To" ? "Aku" : "Son To"
    });
  };

  render = () =>
      <div>
        <h4 className="bg-primary text-center p-2 text-white">
          {this.state.userName}'s To Do List
        </h4>
        <button className="btn btn-primary m-2" onClick={this.changeStateData}>
          Change
        </button>
      </div>
}