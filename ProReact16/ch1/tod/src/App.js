import React, {Component} from 'react';
import { TodoBanner } from "./TodoBanner";
import { TodoRow } from "./TodoRow";
import { TodoCreator } from "./TodoCreator";
import { VisibilityControl } from "./VisibilityControl";

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
      showCompleted: true,
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
      }, () => localStorage.setItem("todos", JSON.stringify(this.state)));
    }
  };

  toggleToDo = (todo) => {
    this.setState({
      todoItems: this.state.todoItems.map(item => item.action === todo.action ?
        {...item, done: !item.done} : item)
    });
  };

  toDoTableRows = (doneValue) => this.state.todoItems
  .filter(item => item.done === doneValue).map(item =>
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
              {this.toDoTableRows(false)}
            </tbody>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="Completed Tasks"
            isChecked={this.state.showCompleted}
            callback={(checked) =>
            this.setState({showCompleted: checked})} />
          </div>
          { this.state.showCompleted &&
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody> {this.toDoTableRows(true)} </tbody>
            </table> 
          }
        </div>
      </div>

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState( data !== null ?
      JSON.parse(data) : 
      {
        userName: "Son To",
        todoItems: [
        {action: "Read Microeconomic Theory", done: false},
        {action: "Read Calculus, Apostol", done: false},
        {action: "Read Algebra, Artin", done: false},
        {action: "Read Fundamentals of Probability, Ross", done: false},
        {action: "Read Statistical Inference, Casella", done: false}
      ],
        showCompleted: true,
      }
    );
  };
}