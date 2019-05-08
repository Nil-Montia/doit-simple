import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from "./StatusButton";
import Cell from "./Cell";

class TaskRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this.props.fields,
            task: {id: 1, Description: "hello", Status: 0, dueDate: "12", empty:" "},
            row:this.props.row,
            showDelete:false
        };
    }


    render() {
        let delbutton = <button type="button" className="btn btn-danger btn-sm">-</button>
        return (
            <tr>
                <td onClick={() => (this.setState({showDelete:true}))}>{!this.state.showDelete? this.props.row : delbutton}</td>
                {this.state.fields.map((field) => <Cell field={field} info={this.state.task[field]}/>)}
            </tr>
        )
    }
}

export default TaskRow;