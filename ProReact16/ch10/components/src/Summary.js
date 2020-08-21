import React from "react";

export function Summary(props) {
    return(
        <h4 className="bg-info text-white text-center p-2">
            {
                props.names.map(name => 
                  <div className="m-2 bg-success" key={name}>
                      {`${name} contains ${name.length}
                      letters.`}
                  </div>  
                )
            } {/* {} evaluator lists all array elements as if it is a string */}
        </h4>
    );
}