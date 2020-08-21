import React from "react";
// import {Message} from "./Message";
import { Summary } from "./Summary";

export default function App() {
  return (
      <div>
        <h1 className="bg-primary text-white text-center p-2">
            Hello Adam
        </h1>
{/*         <Message greeting="Hello" name="Bob" />
        <Message greeting="Hola" name={"Alice" + "Bob"} />
        <Message greeting="Hi there" name="Dora" />
 */}    
        <Summary names={["Bob", "Alice", "Dora"]} />
      </div>
  );
}

/* For exporting arrow function and default ones 
export const App = () => ...;
export default App; 
*/