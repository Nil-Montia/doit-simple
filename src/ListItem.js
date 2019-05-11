import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {BACKEND_URL} from './api-config';

class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: props.task,
            text: props.task.description || "whoops",
            dueDate: props.task.dueDate,
            taskID: props.task.id,
            blockid: props.task.blockid,
            usrid: props.task.userid,
            isInput: false
        };
    };

    display = (e) => {
        if (e.key === "Enter") {
            this.update(this.state.taskID, this.state.text, this.props.dueDate, this.props.blockid);
            this.setState({
                isInput: false
            })
        }
    };


    update = (id, text) => {
        const request = new XMLHttpRequest();
        const url = `http://${BACKEND_URL}:8082/task/update/${id}`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        let body;
        body = JSON.stringify({
            description: text,
            userid: this.state.usrid,
            dueDate: this.state.dueDate || this.getDate(),
            blockid: this.state.blockid || null
        });
        request.onload = (e) => {
            console.log(request.status);
            this.props.loadUserListItems();
        };
        request.send(body);
    };

    mobileDisplay = () => {
        this.props.update(this.props.taskID, this.state.text);
        this.setState({
            isInput: false
        })
    }

    transcribe = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    render() {

        let item = <div className={"col d-inline-flex"}>
            <span className={"text-truncate mr-3"} onClick={() => {
                this.setState({isInput: true})
            }}>{this.props.text}</span>
            <button className={"button btn-small btn-danger ml-auto"}
                    onClick={() => {
                        this.props.delete(this.state.taskID)
                    }}>
                -
            </button>
        </div>;

        let input = <span onBlur={() => {this.setState({isInput: false})}}><input autoFocus type={"text"} className={"form-control"} placeholder={"Input description"}
                                 onChange={this.transcribe} onKeyDown={this.display} value={this.state.text}/><button
            className={"d-md-none btn btn-dark"} onClick={this.mobileDisplay}>Update</button></span>;
        return (<div onBlur={() => {this.setState({isInput: false})}}>
            {!this.state.isInput ? item : input}
        </div>)
    }
}

export default ListItem;