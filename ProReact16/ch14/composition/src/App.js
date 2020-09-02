import React, { Component } from "react";
// import { Message } from "./Message";
// import { ActionButton } from "./ActionButton";
// import { ThemeSelector } from "./ThemeSelector";
// import { GeneralList } from "./GeneralList";
import { SortedList } from "./SortedList";
import { ProModeContext } from "./ProModeContext"; /* Context Provider */
import { ProModeToggle } from "./ProModeToggle";
// import { ProFeature } from "./ProFeature";
// import { ProController } from "./ProController";
// import { LogToConsole } from "./LogToConsole";

// const ProList = ProController(LogToConsole(SortedList, "Sorted", true, true, true));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //counter: 0,
      names: ["Zoe", "Bob", "Alice", "Dora", "Joe"],
      cities: ["London", "New York", "Paris", "Milan", "Boston"],
      //proMode: false,
      proContextData: {
        proMode: false,
        toggleProMode: this.toggleProMode
      },
      superProContextData: {
        proMode: false,
        toggleProMode: this.toggleSuperMode
      }
    };
  }

  // incrementCounter = () => {
  //   this.setState({counter: this.state.counter + 1});
  // };

  toggleProMode = () => {
    this.setState(state => {
      return {proContextData: Object.assign({}, state.proContextData, {
        proMode: !state.proContextData.proMode
      })};
    });
  };

  toggleSuperMode = () => {
    this.setState(state => {
      return {superProContextData: Object.assign({}, state.superProContextData, {
        proMode: !state.superProContextData.proMode
      })}
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 text-center p-2">
            <ProModeContext.Provider value={this.state.proContextData}>
              <ProModeToggle label="Pro Mode" />
            </ProModeContext.Provider>
          </div>
          <div className="col-6 text-center p-2">
            <ProModeContext.Provider value={this.state.superProContextData}>
              <ProModeToggle label="Super Pro Mode" />
            </ProModeContext.Provider>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <ProModeContext.Provider value={this.state.proContextData}>
              <SortedList list={this.state.cities} />
            </ProModeContext.Provider>
          </div>
          <div className="col-6">
            <ProModeContext.Provider value={this.state.superProContextData}>
              <SortedList list={this.state.names} />
            </ProModeContext.Provider>
          </div>
        </div>
      </div>
    );
  }
}