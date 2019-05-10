import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from "./StatusButton";

class TaskRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this.props.fields,
            task: props.task,
            row:this.props.row,
            showDelete:false,
            loadOwnTasks:this.props.loadOwnTasks,
            descriptionIsInput:false,
            dueDateIsInput:false,
            description:props.task.description,
            dueDate:props.task.dueDate
        };
    }

    /**
     * Update state when task prop is updated.
     * 'This method exists for rare use cases where the state depends on changes in props over time.'
     * See: https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
     * @param props
     * @param state
     * @returns {{task: *}}
     */
    static getDerivedStateFromProps(props, state) {
        return {...state, task: props.task };
    }

    transcribeDescription = (e) => {
        this.setState({
            description:e.target.value
        })
    };

    transcribeDate = (e) => {
        this.setState({
            dueDate:e.target.value
        })
    };

    update = (e) => {
        if (e.key === "Enter"){
            this.setState({
                descriptionIsInput:false,
                dueDateIsInput:false
            })
            const request = new XMLHttpRequest();
            const url = `http://localhost:8082/task/update/${this.props.task.id}`;
            request.open("POST", url);
            request.responseType = 'json';
            request.setRequestHeader("content-Type", "application/json");
            let body;
            body = JSON.stringify({status: this.state.status,
                userid: this.props.task.usrid,
                description: this.state.description,
                dueDate: this.state.dueDate,
                blockid: this.props.task.blockid,
            })
            request.onload = (e) => {
                this.props.loadOwnTasks();
            };
            request.send(body);
        }
    };

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
        let description= <span onClick={() => this.setState({descriptionIsInput:true})}>{this.state.task.description}</span>;
        let dueDate= <span onClick={() => this.setState({dueDateIsInput:true})}>{this.state.task.dueDate}</span>;
        let descInput= <span><input type={"text"} className={"form-control"} placeholder={"Enter description"} onKeyDown={this.update} onChange={this.transcribeDescription}/></span>;
        let dateInput= <span><input type={"date"} className={"form-control"} placeholder={"Enter description"} onKeyDown={this.update} onChange={this.transcribeDate}/></span>;
        let delbutton = <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteTask}>-</button>;

        return (
            <tr>
                <td onClick={() => (this.setState({showDelete:true}))}>{!this.state.showDelete? this.props.row : delbutton}</td>
                <td>{!this.state.descriptionIsInput ? description : descInput}</td>
                <td><Button status={this.state.task.status} loadOwnTasks={this.state.loadOwnTasks} taskId={this.state.task.id} blockid={this.props.blockid} usrid={this.props.usrid} task={this.props.task}/></td>
                <td>{!this.state.dueDateIsInput ? dueDate : dateInput}</td>
            </tr>
        )
    }
}

export default TaskRow;