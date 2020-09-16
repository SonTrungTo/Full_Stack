import React, {Component} from 'react';
import { TodoBanner } from "./TodoBanner";
import { TodoRow } from "./TodoRow";
import { TodoCreator } from "./TodoCreator";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Son To",
      todoItems: [
        {action: "Read Microeconomic Theory", done: false},
        {action: "Read Calculus, Apostol", done: false},
        {action: "Read Algebra, Artin", done: false},
        {action: "Read Fundamentals of Probability, Ross", done: false},
        {action: "Read Statistical Inference, Casella", done: false}
      ],
      //nextItemText: ""
    };
  }

  // updateNewTextValue = (event) => {
  //   this.setState({nextItemText: event.target.value});
  // };

  createNewToDo = (task) => {
    if (!this.state.todoItems.some(item => item.action === task)) {
      this.setState({
        todoItems: [...this.state.todoItems, {action: task, done: false}]
      });
    }
  };

  toggleToDo = (todo) => {
    this.setState({
      todoItems: this.state.todoItems.map(item => item.action === todo.action ?
        {...item, done: !item.done} : item)
    });
  };

  toDoTableRows = () => this.state.todoItems.map(item =>
      <TodoRow key={item.action} item={item} callback={this.toggleToDo} />
    );

  render = () =>
      <div>
        <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
        <div className="container-fluid">
          <TodoCreator callback={this.createNewToDo} />
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {this.toDoTableRows()}
            </tbody>
          </table>
        </div>
      </div>
}