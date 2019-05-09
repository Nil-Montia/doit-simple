import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Cell from "./Cell";

class TaskRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this.props.fields,
            task: props.task,
            row:this.props.row,
            showDelete:false,
            loadOwnTasks:this.props.loadOwnTasks
        };
    }

    deleteTask = () => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8082/task/delete/${this.state.task.id}`;
        request.open("DELETE", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onload = () => {
            this.props.loadOwnTasks();
        };
        request.send();
    }

    render() {
        let delbutton = <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteTask}>-</button>
        return (
            <tr>
                <td onClick={() => (this.setState({showDelete:true}))}>{!this.state.showDelete? this.props.row : delbutton}</td>
                {this.state.fields.map((field) => <Cell field={field} info={this.state.task[field]} loadOwnTasks={this.state.loadOwnTasks} taskId={this.state.task.id} blockid={this.props.blockid}/>)}
            </tr>
        )
    }
}

export default TaskRow;