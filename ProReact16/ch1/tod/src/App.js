import React, {Component} from 'react';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Son To",
      todoItems: [
        {action: "Read Microeconomic Theory", done: false},
        {action: "Read Calculus, Apostol", done: false},
        {action: "Read Algebra, Artin", done: false},
        {action: "Read Fundamnetals of Probability, Ross", done: false},
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
        </div>
      </div>
}