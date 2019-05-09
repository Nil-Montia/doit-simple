import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Button extends Component{
    constructor(props){
        super(props);
        this.style = ["btn-info","btn-warning","btn-danger", "btn-success"];
        this.buttonText = {"btn-info" : "Pending", "btn-warning": "Urgent", "btn-danger": "Uncompleted", "btn-success":"Completed"}
        this.state=({
            status:this.props.status||0,
            usrid:this.props.usrid,
            taskId:this.props.taskId,
            className:props.className||"",
            isInput:this.props.isInput||false
        })
    }


    statusChange=(e)=> {
        this.setState ({
            status:((this.state.status+1)%this.style.length)
        });
        if (this.props.isInput){
            this.props.transcribeStatus(this.state.status);
        }else{
            this.update();
        }

    };

    update = () => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8082/task/update/${this.props.taskId}`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        let body;
        body = JSON.stringify({status : this.state.status, userid: this.props.usrid})
        request.onload = (e) => {
            this.props.loadOwnTasks();
        };
        request.send(body);
    };

    render() {
        return (
            <div className={this.state.className}>
                <button type="button" className={"btn "+this.style[this.state.status]}  onClick={this.statusChange}>{this.buttonText[this.style[this.state.status]]}</button>
            </div>
        )
    }
}
export default Button;