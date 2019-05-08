import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import TaskRow from "./TaskRow";
import Cell from "./Cell";
import InputRow from "./InputRow";

class TaskBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title || "Task Block",
            titleIsInput: false,
            subtitle: this.props.subtitle || "",
            subtitleIsInput: false,
            fields: ["Description", "Status", "dueDate"],
            blockid: this.props.blockid || 0,
            taskList: [],
            row:1,
            taskadd:false,
            usrid:props.usrid
        }
    };

    transcribeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
        //update title
    };

    displayTitle = (e) => {
        if (e.key === "Enter") {
            //this.props.update(this.props.taskID, this.state.text)
            this.setState({
                isInput: false
            })
        }
    };

    createTask = () => {

    };

    loadOwnTasks = () => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8082/task/block/${this.state.blockid}`;
        request.open("GET", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json")
        request.onload = () => {
            console.log(request.response)
            let list = request.response;
            console.log("BlockList: ", list);
            this.setState({
                taskList: list
            })
        };
        request.send();
    }

    componentDidMount() {
        this.loadOwnTasks();
    }

    render() {
        let title = <h1 className="card-title ml-1 col-10" onClick={() => {
            this.setState({titleIsInput: true})
        }}>{this.state.title}</h1>;
        let subtitle = <h2 className="card-subtitle ml-1 mb-1">{this.state.subtitle}</h2>;
        let addButton = <button type="button" className="btn btn-dark btn-sm" onClick={()=>(this.setState({taskadd : true}))}>+</button>;
        let cancelButton= <button type="button" className="btn btn-secondary btn-sm" onClick={()=>(this.setState({taskadd : false}))}>-</button>;
        return (
            <div className="col-6 col-md-6 col-sm-12 align-self-center">
                <div className="card m-1 align-self-center">
                    <div className="row">
                        {title}
                    </div>
                    {this.subtitle !== "" ? subtitle : ""}
                    <table className="table myTable">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">
                                {!this.state.taskadd ? addButton : cancelButton}
                            </th>
                            {this.state.fields.map((item) => <th
                                scope={"col"}>{item}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        <TaskRow row={1} fields={this.state.fields}/>
                        <TaskRow row={2} fields={this.state.fields}/>
                        {this.state.taskadd ? <InputRow/> : ""}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TaskBlock;