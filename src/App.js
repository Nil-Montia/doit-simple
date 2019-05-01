import React, {Component} from 'react';
import ListItem from "./ListItem";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Navbar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "something",
            arr: [],
            login: false
        }
    }

    listLoad = () =>{
        if (this.state.login){
            this.loadUserListItems()
        }else{
            this.loadListItems()
        }
    };

    loadListItems = () => {
        const request = new XMLHttpRequest();
        const url = 'http://localhost:8080/task/getAll';
        request.open("GET", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json")
        request.onload = () => {
            let list = request.response;
            console.log("listGeneral: ", list);
            this.setState({
                arr: list
            })
        };
        request.send();
    };

    loadUserListItems = () => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8080/task/get/${this.state.usrid}`;
        request.open("GET", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json")
        request.onload = () => {
            let list = request.response;
            console.log("listUser: ", list);
            this.setState({
                arr: list
            })
        };
        request.send();
    };

    componentDidMount() {
        this.listLoad();
    }

    create = (text) => {
        const request = new XMLHttpRequest();
        const url = 'http://localhost:8080/task/create';
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json")
        let body;
        if (this.state.login){
            body = JSON.stringify({description: text, userid:this.state.usrid})
        }else{
            body = JSON.stringify({description: text})
        }
        request.onload = (e) => {
            console.log(request.status);
            this.listLoad();
        };
        request.send(body);
    };

    update = (id, text) => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8080/task/update/${id}`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        let body;
        if (this.state.login){
            body = JSON.stringify({description: text, userid:this.state.usrid})
        }else{
            body = JSON.stringify({description: text})
        }
        request.onload = (e) => {
            console.log(request.status);
            this.listLoad();
        };
        request.send(body);
    };

    delete = (id) => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8080/task/delete/${id}`;
        request.open("DELETE", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request.onload = () => {
            console.log("status: ", request.status);
            this.listLoad()
        };
        request.send();
    };

    transcribe = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    login = (usernm, passwd) => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8080/user/login`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        let body = JSON.stringify({username:usernm, password:passwd});
        request.onload = () => {
            console.log(request.response);
            if (request.response!=="Unsuccessful"){
                this.setState({
                    login:true,
                    usrid:request.response
                });
                this.loadUserListItems();
            }
            else{
                window.alert("Wrong username and password combination")
            }
        };
        request.send(body);
    };

    render() {
        console.log("Array in render: ", this.state.arr);
        return (
            <div className={"card"}>
                <Navbar login={this.login} ref={this.NavbarElement}/>
                <input className={"form-control"} type={"text"} placeholder={"Enter task"} onChange={this.transcribe}/>
                <button type={"submit"} onClick={() => {
                    this.create(this.state.text)
                }}>Submit
                </button>
                {this.state.arr.map((item, index) => <ListItem className={"self-align-center"} key={"item" + index}
                                                               text={item.description} taskID={item.id}
                                                               update={this.update}
                                                               delete={this.delete}/>)}
            </div>);
    }
}

export default App;
