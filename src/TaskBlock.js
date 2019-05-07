import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class TaskBlock extends Component{
    constructor(props){
        super(props);
        this.state={
            title:this.props.title||"Task Block",
            titleIsInput:false,
            subtitle:this.props.subtitle||"Subtitle",
            subtitleIsInput:false,
            tableHeaders:["id", "Description", "Status", "Due date"],
            fields:[{type:"text",head:"id"}, {type:"text",head:"Description"},{type:"button",head:"Status"},{type:"date",head:"Due date"}],
            blockId:this.props.id||0,
            taskList:[]
        }
    };

    transcribeTitle = (e) => {
        this.setState({
            title:e.target.value
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

    render(){
        let title = <h1 className="card-title ml-1 col-10" onClick={() => {this.setState({titleIsInput: true})}}>{this.state.title}</h1>;
        let titleInput=<input type={"text"}className={"form-control"} placeholder={"Enter title..."} onChange={this.transcribeTitle} onKeyDown={this.displayTitle}/>;
        let subtitle= <h2 className="card-subtitle ml-1 mb-1">{this.state.subtitle}</h2>;
        return(
            <div className="col-6 col-md-6 col-sm-12 align-self-center">
                <div className="card m-1 align-self-center">
                    <div className="row">
                        {!this.titleIsInput ? title : titleInput}
                    </div>
                    {this.subtitle!=="" ? subtitle : ""}
                    <table className="table myTable">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">
                                <button type="button" className="btn btn-dark btn-sm">+</button>
                            </th>
                            {this.state.fields.filter((item, index) => index>0).map((item) => <th scope={"col"}>{item.head}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {/*<Task fields={this.state.fields} record={this.state.taskList[1]}/>*/}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TaskBlock;