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
            input:"",
            show:""
        }
    }

    componentDidMount() {
        this.setState({
            input: this.makeInput(this.props.field),
            show: this.makeShow(this.props.field)
        })
    }

    makeShow(field){
        if (field==="Status"){
            return <Button statusId={this.props.info}/>
        }else{
            return <span onClick={()=>(this.setState({isInput:true}))}> {this.props.info}</span>
        }
    }

    localUpdate = (e) =>{
        if (e.key==="Enter"){
            //this.props.update(this.props.taskID, this.state.text)
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
        console.log("The cell says: ", this.state.info)
    };

    update = (info) => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8082/task/update/${this.taskID}`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        let body;
        body = JSON.stringify({[this.props.field] : info, userid: this.props.usrid})
        request.onload = (e) => {
            console.log(request.status);
            this.loadUserListItems();//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        };
        request.send(body);
    };


    makeInput(field){
        if (field==="Status"){
            return "";
        }else{
            let dictionary = {Description: "text", dueDate: "date"};
            return (
                <input type={dictionary[field]} classname={"form-control"} placeholder={`Enter ${field}`} onKeyDown={this.localUpdate} onChange={this.transcribe}/>
            )
        }
    }

    render() {
        return(
            <td>{!this.state.isInput ? this.state.show : this.state.input}</td>
        )
    }
}

export default Cell;