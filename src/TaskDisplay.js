import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ListItem from "./ListItem";

class TaskDisplay extends Component{
    constructor(props){
        super(props);
        this.state = {
            usrid:this.props.usrid,
            text: "something",
            arr: [{description:"WHOOPS",id:0}],
        }
    }


    create = (text) => {
        const request = new XMLHttpRequest();
        const url = 'http://localhost:8082/task/create';
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json")
        let body;
        body = JSON.stringify({description: text, userid: this.state.usrid})
        request.onload = (e) => {
            console.log(request.status);
            this.loadUserListItems();
        };
        request.send(body);
    };

    update = (id, text) => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8082/task/update/${id}`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        let body;
        body = JSON.stringify({description: text, userid: this.state.usrid})
        request.onload = (e) => {
            console.log(request.status);
            this.loadUserListItems();
        };
        request.send(body);
    };

    delete = (id) => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8082/task/delete/${id}`;
        request.open("DELETE", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onload = () => {
            console.log("status: ", request.status);
            this.loadUserListItems()
        };
        request.send();
    };

    loadUserListItems = () => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8082/task/get/${this.state.usrid}`;
        request.open("GET", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json")
        request.onload = () => {
            console.log(request.response)
            let list = request.response;
            console.log("listUser: ", list);
            this.setState({
                arr: list
            })
        };
        request.send();
    };

    transcribe = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    componentDidMount =() => {
        this.loadUserListItems();
    }

    render(){
        return(
            <div className={"card"}>
                <input className={"form-control"} type={"text"} placeholder={"Enter task"} onChange={this.transcribe}/>
                <button type={"submit"} onClick={() => {
                    this.create(this.state.text)
                }}>Submit
                </button>
                {this.state.arr.map((item, index) => <ListItem className={"self-align-center"} key={"item" + index}
                                                               text={item.description} taskID={item.id}
                                                               update={this.update}
                                                               delete={this.delete}/>)}
            </div>
        )
    }
}

export default TaskDisplay;