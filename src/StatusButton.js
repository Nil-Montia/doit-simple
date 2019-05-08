import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Button extends Component{
    constructor(props){
        super(props);
        this.style = ["btn-info","btn-warning","btn-danger", "btn-success"];
        this.buttonText = {"btn-info" : "Pending", "btn-warning": "Urgent", "btn-danger": "Uncompleted", "btn-success":"Completed"}
        this.state=({
            statusId:this.props.statusId||0,
            usrid:this.props.usrid
        })

    }

    statusChange=(e)=> {
        this.setState ({
            statusId:((this.state.statusId+1)%this.style.length)
        });
        this.update()
    }

    update = () => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8082/task/update/${this.taskID}`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        let body;
        body = JSON.stringify({Status : this.state.statusId, userid: this.props.usrid})
        request.onload = (e) => {
            console.log(request.status);
            this.loadUserListItems();//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        };
        request.send(body);
    };

    render() {
        return (
            <div>
                <button type="button" className={"btn "+this.style[this.state.statusId]}  onClick={this.statusChange}>{this.buttonText[this.style[this.state.statusId]]}</button>
            </div>
        )
    }
}
export default Button;