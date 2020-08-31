import React, { Component } from "react";
// import { Message } from "./Message";
// import { ActionButton } from "./ActionButton";
// import { ThemeSelector } from "./ThemeSelector";
import { GeneralList } from "./GeneralList";
import { SortedList } from "./SortedList";
// import { ProFeature } from "./ProFeature";
import { ProController } from "./ProController";

const ProList = ProController(SortedList);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //counter: 0,
      names: ["Zoe", "Bob", "Alice", "Dora", "Joe"],
      cities: ["London", "New York", "Paris", "Milan", "Boston"],
      //proMode: false
    };
  }

  // incrementCounter = () => {
  //   this.setState({counter: this.state.counter + 1});
  // };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <GeneralList theme="primary" list={this.state.names} />
          </div>
          <div className="col-3">
            <ProList list={this.state.names} />
          </div>
          <div className="col-3">
            <GeneralList theme="secondary" list={this.state.cities} />
          </div>
          <div className="col-3">
            <ProList list={this.state.cities} />
          </div>
        </div>
      </div>
    );
  }
}