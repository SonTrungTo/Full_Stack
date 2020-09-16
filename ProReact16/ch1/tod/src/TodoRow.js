import React, { Component } from "react";

export class TodoRow extends Component {
    render = () =>
        <tr>
            <td>{this.props.item.action}</td>
            <td>
                <input type="checkbox" value={this.props.item.done}
                onChange={() => this.props.callback(this.props.item)} />
            </td>
        </tr>
}