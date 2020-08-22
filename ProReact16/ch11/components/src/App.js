import React from "react";
// import {Message} from "./Message";
import { Summary } from "./Summary";
import ReactDOM from "react-dom";

let names = ["Bob", "Alice", "Dora"];

function reverseNames() {
  names.reverse();
  ReactDOM.render(<App />, document.getElementById('root'));
}

function promoteName(name) {
  names = [name, ...names.filter(val => val !== name)];
  ReactDOM.render(<App />, document.getElementById('root'));
}

export default function App() {
  return(
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Letters</th>
        </tr>
      </thead>
      <tbody>
        {
          names.map((name, index) =>
            <tr key={name}>
              <Summary name={name} index={index} 
              reverseCallback={reverseNames}
              promoteCallback={promoteName} />
            </tr>
          )
        }
      </tbody>
    </table>
  );
}

/* For exporting arrow function and default ones 
export const App = () => ...;
export default App; 
*/