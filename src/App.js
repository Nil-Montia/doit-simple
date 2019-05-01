import React, {Component} from 'react';
import ListItem from "./ListItem";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Navbar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "something",
            arr: []
        }
    }

    loadListItems = () => {
        const request = new XMLHttpRequest();
        const url = 'http://localhost:8080/task/getAll';
        request.open("GET", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json")
        request.onload = (e) => {
            let list = request.response;
            console.log("list: ", list);
            this.setState({
                arr: list
            })
        };
        request.send();
    };

    componentDidMount() {
        this.loadListItems();
    }

    create = (text) => {
        const request = new XMLHttpRequest();
        const url = 'http://localhost:8080/task/create';
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json")
        let body = JSON.stringify({description: text})
        request.onload = (e) => {
            console.log(request.status)
            this.loadListItems()
        };
        request.send(body);
    }

    update = (id, text) => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8080/task/update/${id}`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        let body = JSON.stringify({description: text});
        request.onload = (e) => {
            console.log(request.status)
            this.loadListItems()
        };
        request.send(body);
    }

    delete = (id) => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8080/task/delete/${id}`;
        request.open("DELETE", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onload = () => {
            console.log("status: ", request.status);
            this.loadListItems()
        };
        request.send();
    }

    transcribe = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        console.log("Array in render: ", this.state.arr);
        return (
            <div className={"card"}>
                <Navbar/>
                <input className={"form-control"} type={"text"} placeholder={"Enter task"} onChange={this.transcribe}/>
                <button type={"submit"} onClick={() => {
                    this.create(this.state.text)
                }}>Submit
                </button>
                {this.state.arr.map((item, index) => <ListItem className={"self-align-center"} key={"item" + index}
                                                               text={item.description} taskID={item.id}
                                                               update={this.update}
                                                               delete={this.delete} sayHi={this.sayHi}/>)}
            </div>);
    }
}

export default App;
