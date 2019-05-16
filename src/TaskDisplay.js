import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ListItem from "./ListItem";
import TaskBlock from "./TaskBlock";
import {BACKEND_URL} from './api-config';

class TaskDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usrid: this.props.usrid,
            text: "something",
            arr: [],
            blockList: []
        }
    }

    getDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    create = (text) => {
        const request = new XMLHttpRequest();
        const url = `${BACKEND_URL}/task/create`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        let body;
        body = JSON.stringify({description: text, userid: this.state.usrid, dueDate: this.getDate()});
        request.onload = () => {
            this.loadUserListItems();
        };
        request.send(body);
    };


    delete = (id) => {
        const request = new XMLHttpRequest();
        const url = `${BACKEND_URL}/task/delete/${id}`;
        request.open("DELETE", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onload = () => {
            this.loadUserListItems()
        };
        request.send();
    };

    loadUserListItems = () => {
        const request = new XMLHttpRequest();
        const url = `${BACKEND_URL}/task/get/${this.state.usrid}`;
        request.open("GET", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.onload = () => {
            let list = request.response;
            this.setState({
                arr: list
            });
            this.loadBlockList();
        };
        request.send();
    };

    transcribe = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    createBlock = () => {
        const request = new XMLHttpRequest();
        const url = `${BACKEND_URL}/block/create`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        let body = JSON.stringify({userid: this.state.usrid})
        request.onload = () => {
            this.loadBlockList();
        };
        request.send(body);
    };

    componentDidMount = () => {
        this.loadUserListItems();
        this.loadBlockList();
    };

    loadBlockList = () => {
        const request = new XMLHttpRequest();
        const url = `${BACKEND_URL}/block/get/${this.state.usrid}`;
        request.open("GET", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json")
        request.onload = () => {
            let list = request.response;
            this.setState({
                blockList: list
            })
        };
        request.send();
    };

    render() {
        let listview = <div className={"card"}><input className={"form-control"} type={"text"}
                                                      placeholder={"Enter task"} onChange={this.transcribe}/>
            <button type={"submit"} onClick={() => {
                this.create(this.state.text)
            }}>Submit
            </button>
            {this.state.arr.map((item, index) => <ListItem className={"self-align-center"} key={"item" + index}
                                                           task={item}
                                                           text={item.description} taskID={item.id}
                                                           update={this.update}
                                                           delete={this.delete} dueDate={item.dueDate || this.getDate()}
                                                           blockid={item.blockid}
                                                           loadUserListItems={this.loadUserListItems}/>)}</div>;
        let blockview = this.state.blockList.map((bloc, index) => (
            <TaskBlock key={index} blockid={bloc.blockid} usrid={this.props.usrid} loadBlockList={this.loadBlockList}
                       title={bloc.title} loadUserListItems={this.loadUserListItems}/>));
        let addBlock = <div>
            <div className={"col"}>
                <button type={"button"} className={"btn btn-outline-secondary"} onClick={this.createBlock}> Add Task
                    Block
                </button>
            </div>
            {blockview}
        </div>;


        return (
            <div>
                {!this.props.listView ? addBlock : listview}
            </div>
        )
    }
}

export default TaskDisplay;