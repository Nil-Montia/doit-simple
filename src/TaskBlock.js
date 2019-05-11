import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TaskRow from "./TaskRow";
import InputRow from "./InputRow";
import { BACKEND_URL } from './api-config';
import './TaskBlock.css'

class TaskBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title || "Task Block",
            titleIsInput: false,
            titles: ["Description","Status", "Due date"],
            fields: ["description", "status", "dueDate"],
            blockid: this.props.blockid,
            taskList: [],
            row: 1,
            taskadd: false,
            usrid: props.usrid
        }
    };

    static getDerivedStateFromProps(props, state) {
        return {...state, blockid: props.blockid};
    }

    transcribeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    };

    displayTitle = (e) => {
        if (e.key === "Enter") {
            //this.props.update(this.props.taskID, this.state.text)
            this.setState({
                titleIsInput: false
            });
            this.updateTitle()
        }
    };


    updateTitle = () => {
        const request = new XMLHttpRequest();
        const url = `http://${BACKEND_URL}:8082/block/update/${this.props.blockid}`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        let body = JSON.stringify({title: this.state.title, userid: this.props.usrid});
        request.onload = (e) => {
            this.props.loadBlockList();
        };
        request.send(body);
    };

    loadOwnTasks = () => {
        const request = new XMLHttpRequest();
        const url = `http://${BACKEND_URL}:8082/task/block/${this.state.blockid}`;
        request.open("GET", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.onload = () => {
            let list = request.response;
            this.setState({
                taskList: list
            });
            this.props.loadUserListItems();
        };
        request.send();
    };

    componentDidMount() {
        this.loadOwnTasks();
    };

    deleteBlock = () => {
        const request = new XMLHttpRequest();
        const url = `http://${BACKEND_URL}:8082/block/delete/${this.state.blockid}`;
        request.open("DELETE", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onload = () => {
            this.props.loadBlockList();
        };
        request.send();
    };


    render() {
        let title = <h1 className="card-title ml-1 col-10" onClick={() => {
            this.setState({titleIsInput: true})
        }}>{this.state.title}</h1>;
        let input = <div className={"input-group input-group-lg col-6 mb-2"}><input autoFocus type={"text"}
                                                                                    className={"form-control"}
                                                                                    placeholder={"Input description"}
                                                                                    onChange={this.transcribeTitle}
                                                                                    onKeyDown={this.displayTitle}
                                                                                    value={this.state.text}
        onBlur={()=>(this.setState({titleIsInput:false}))}/></div>;
        let addButton = <button type="button" className="btn btn-dark btn-sm"
                                onClick={() => (this.setState({taskadd: true}))}>+</button>;
        let cancelButton = <button type="button" className="btn btn-secondary btn-sm"
                                   onClick={() => (this.setState({taskadd: false}))}>-</button>;


        return (
            <div className="col-11 col-md-9 col-sm-12 mr-auto ml-auto">
                <div className="card m-1 align-self-center background-light">
                    <div className="row">
                        {!this.state.titleIsInput ? title : input}
                        <button type="button" className="btn btn-outline-danger ml-auto mr-2 mb-2 deleteButton text-center"
                                onClick={this.deleteBlock}>X
                        </button>
                    </div>
                    <table className="table myTable">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">
                                {!this.state.taskadd ? addButton : cancelButton}
                            </th>
                            {this.state.titles.map((item, index) => <th
                                scope={"col"} key={index}>{item}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.taskList.map((task, index) => (
                            <TaskRow key={index} fields={this.state.fields} task={task} loadOwnTasks={this.loadOwnTasks}
                                     blockid={this.state.blockid} row={1+index} usrid={this.props.usrid}/>))}
                        {this.state.taskadd ?
                            <InputRow loadOwnTasks={this.loadOwnTasks} usrid={this.props.usrid}
                                      blockid={this.props.blockid}/> : null}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    };
}

export default TaskBlock;