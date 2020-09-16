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
      nextItemText: ""
    };
  }

  updateNewTextValue = (event) => {
    this.setState({nextItemText: event.target.value});
  };

  createNewToDo = () => {
    if (!this.state.todoItems.some(item => item.action === item.nextItemText)) {
      this.setState({
        todoItems: [...this.state.todoItems, {action: this.state.nextItemText, done: false}],
        nextItemText: ""
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
      <tr key={item.action}>
        <td>{item.action}</td>
        <td>
          <input type="checkbox" checked={item.done}
          onChange={() => this.toggleToDo(item)} />
        </td>
      </tr>  
    );

  render = () =>
      <div>
        <h4 className="bg-primary text-center p-2 text-white">
          {this.state.userName}'s To Do List
          ({this.state.todoItems.filter(item => !item.done).length} items to do)
        </h4>
        <div className="container-fluid">
          <div className="my-1">
            <input className="form-control"
            value={this.state.nextItemText}
            onChange={this.updateNewTextValue} />
            <button className="btn btn-primary mt-1"
            onClick={this.createNewToDo}>
              Add
            </button>
          </div>
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