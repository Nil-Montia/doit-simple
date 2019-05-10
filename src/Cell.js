import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from "./StatusButton";

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            field: props.field,
            info: this.props.info,
            isInput: false,
            input: "",
            show: ""
        }
    }

    componentDidMount() {
        this.setState({
            input: this.makeInput(this.props.field),
        })
    }

    // makeShow(field){
    //     if (field==="status"){
    //         return
    //     }else{
    //         return
    //     }
    // }

    localUpdate = (e) => {
        if (e.key === "Enter") {
            this.setState({
                isInput: false
            })
            this.update(this.state.info)
        }
    };

    transcribe = (e) => {
        this.setState({
            info: e.target.value
        })
    };

    update = (info) => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8082/task/update/${this.props.taskId}`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        let body;
        body = JSON.stringify({[this.props.field]: info, userid: this.props.usrid, blockid: this.props.blockid});
        request.onload = (e) => {
            this.props.loadOwnTasks();
        };
        request.send(body);
    };


    makeInput(field) {
        if (field === "status") {
            return "";
        } else {
            let dictionary = {description: "text", dueDate: "date", "Due Date": "date"};
            return (
                <input type={dictionary[field]} className={"form-control"} placeholder={`Enter ${field}`}
                       onKeyDown={this.localUpdate} onChange={this.transcribe}/>
            )
        }
    }

    render() {
        return (
            <td>
                {!this.state.isInput ? this.props.field === "status" ?
                <Button status={this.props.info} taskId={this.props.taskId}/> : <span
                    onClick={() => (this.setState({isInput: true}))}> {this.props.info}</span> : this.state.input}
            </td>
        )
    }
}

export default Cell;