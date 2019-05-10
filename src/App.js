import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Navbar";
import RegisterForm from "./RegisterForm";
import TaskDisplay from "./TaskDisplay";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "something",
            arr: [{description:"WHOOPS",id:0}],
            loggedin: false,
            register: false,
            username: "",
            listView:false
        }
    }

    listViewing = () => {
        this.setState({
            listView:true
        })
    };

    blockViewing = () => {
        this.setState({
            listView:false
        })
    };

    login = (usernm, passwd) => {
        const request = new XMLHttpRequest();
        const url = `http://localhost:8082/user/login`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        let body = JSON.stringify({username: usernm, password: passwd});
        request.onload = () => {
            console.log(request.response);
            if (request.response !== 0) {
                this.setState({
                    loggedin: true,
                    usrid: request.response,
                    username: usernm
                });
            } else {
                window.alert("Wrong username and password combination")
            }
        };
        request.send(body);
    };

    signout = () => {
        this.setState({
            loggedin: false,
            username: ""
        });
    };

    render() {

        return (
            <div>
                <Navbar login={this.login} loggedin={this.state.loggedin} username={this.state.username}
                        signout={this.signout} listView={this.state.listView} listViewing={this.listViewing} blockViewing={this.blockViewing}/>
            {this.state.loggedin ? <TaskDisplay usrid={this.state.usrid} listView={this.state.listView}/> : <RegisterForm/>}
            </div>
        )
    }
}

export default App;

