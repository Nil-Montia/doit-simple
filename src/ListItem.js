import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
class ListItem extends Component{
    constructor(props){
        super(props);
        this.state={
            text: props.text||"whoops",
            isInput:false
        };
    };
    display = (e) => {
        if (e.key==="Enter"){
            this.setState({
                isInput: false
            })
        }
    };

    transcribe = (e) => {
        this.setState({
            text:e.target.value
        })
    };

    render(){
        let item= <div onClick={()=>{this.setState({isInput:true})}}>{this.state.text}<button className={"button btn-small btn-danger mr-auto"}>-</button></div>;
        let input=<input type={"text"} className={"form-control"} placeholder={"Input description"} onChange={this.transcribe} onKeyDown={this.display} value={this.state.text}/>;
        return(<div>
            {!this.isInput ? item : input}
        </div>)
    }
}

export default ListItem;