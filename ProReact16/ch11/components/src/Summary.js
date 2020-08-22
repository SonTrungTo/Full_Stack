import React from "react";
//import {CallbackButton} from "./CallbackButton";
import {SimpleButton} from "./SimpleButton";

export function Summary(props) {

    return (
        <> {/* <React.Fragment><React.Fragment /> */}
            <td>{props.index + 1}</td>
            <td>{props.name}</td>
            <td>{props.name.length}</td>
            <td>
                <SimpleButton className="btn btn-warning m-1"
                callback={ props.reverseCallback }
                text={`Reverse (${props.name})`}/>
                <SimpleButton className="btn btn-info m-1" 
                callback={ () => props.promoteCallback(props.name) }
                text={`Promote (${props.name})`} />
            </td>
        </>
        );
    
}