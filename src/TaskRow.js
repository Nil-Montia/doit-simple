import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from "./StatusButton";
import { BACKEND_URL } from './api-config';

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
            const url = `${BACKEND_URL}/task/update/${this.props.task.id}`;
            request.open("POST", url);
            request.responseType = 'json';
            request.setRequestHeader("content-Type", "application/json");
            let body;
            body = JSON.stringify({status: this.state.status,
                userid: this.props.usrid,
                description: this.state.description,
                dueDate: this.state.dueDate,
                blockid: this.props.task.blockid,
            })
            request.onload = () => {
                this.props.loadOwnTasks();
            };
            request.send(body);
        }
    };

    deleteTask = () => {
        const request = new XMLHttpRequest();
        const url = `${BACKEND_URL}/task/delete/${this.state.task.id}`;
        request.open("DELETE", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onload = () => {
            this.props.loadOwnTasks();
        };
        request.send();
    };

    showDate= (input)=> {
        let output = "";
        let cutHere = input.length;
        for (let i = input.length; i > 0; i--) {
            if (input.substring(i - 1, i) === "-") {
                output += input.substring(i, cutHere) + "/";
                cutHere = i - 1;
            }
            if (i === 1) {
                output += input.substring(i - 1, cutHere)
            }
        }
        return output;
    };

    render() {
        let description= <span onClick={() => this.setState({descriptionIsInput:true})}>{this.state.task.description}</span>;
        let dueDate= <span onClick={() => this.setState({dueDateIsInput:true})}>{this.showDate(this.state.task.dueDate)}</span>;
        let descInput= <span><input autoFocus onBlur={() => this.setState({descriptionIsInput:false})} type={"text"} className={"form-control"} placeholder={"Enter description"} onKeyDown={this.update} onChange={this.transcribeDescription}/></span>;
        let dateInput= <span><input autoFocus onBlur={() => this.setState({dueDateIsInput:false})} type={"date"} className={"form-control"} placeholder={"Enter description"} onKeyDown={this.update} onChange={this.transcribeDate}/></span>;
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