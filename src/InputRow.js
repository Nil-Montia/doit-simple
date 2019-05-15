import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from "./StatusButton";
import { BACKEND_URL } from './api-config';

class InputRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: ["description", "status", "dueDate"],
            usrid: props.usrid || 1,
            description: "",
            status: 0,
            isInput: true,
            blockid: this.props.blockid
        };
    }

    getDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    transcribeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    };

    transcribeStatus = (value) => {
        this.setState({
            status: value
        });
    };

    transcribeDueDate = (e) => {
        this.setState({
            dueDate: e.target.value
        });
    };

    createTask = () => {
        const request = new XMLHttpRequest();
        const url = `${BACKEND_URL}/task/create`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        let body = JSON.stringify({
            userid: this.props.usrid,
            description: this.state.description,
            dueDate: this.state.dueDate || this.getDate(),
            blockid: this.props.blockid,
            status: this.state.status
        });
        request.onload = () => {
            this.props.loadOwnTasks();
        };
        request.send(body);
    };


    render() {
        return (
            <tr className={"bg-secondary"}>
                <td>
                    <button type="button" className="btn btn-light btn-sm" onClick={this.createTask}>+</button>
                </td>
                <td><input type={"text"} placeholder={"Enter description"} onChange={this.transcribeDesc}/></td>
                <td><Button className={""} usrid={this.props.usrid} transcribeStatus={this.transcribeStatus}
                            status={this.state.status} isInput={this.state.isInput}/></td>
                <td><input type={"date"} onChange={this.transcribeDueDate}/></td>
            </tr>
        )
    }
}

export default InputRow;