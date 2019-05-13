import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Navbar";
import RegisterForm from "./RegisterForm";
import TaskDisplay from "./TaskDisplay";
import { BACKEND_URL } from './api-config';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "something",
            arr: [{description:"WHOOPS",id:0}],
            loggedin: false,
            register: false,
            username: "",
            listView:false,
            failedLogin:false
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
        const url = `http://${BACKEND_URL}:8082/user/login`;
        request.open("POST", url);
        request.responseType = 'json';
        request.setRequestHeader("content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        let body = JSON.stringify({username: usernm, password: passwd});
        request.onload = () => {
            if (request.response !== 0) {
                this.setState({
                    loggedin: true,
                    usrid: request.response,
                    username: usernm
                });
            } else {
                this.setFailedLogin(true);
            }
        };
        request.send(body);
    };

    setFailedLogin = (boolean) => {
        this.setState({
            failedLogin: boolean
        })
    }

    signout = () => {
        this.setState({
            loggedin: false,
            username: ""
        });
    };


    getDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;
    };


    render() {
        this.getDate();
        return (
            <div className={"background-light"}>
                <Navbar login={this.login} loggedin={this.state.loggedin} username={this.state.username}
                        signout={this.signout} listView={this.state.listView} listViewing={this.listViewing} blockViewing={this.blockViewing} failedLogin={this.state.failedLogin} setFailedLogin={this.setFailedLogin}/>
            {this.state.loggedin ? <TaskDisplay usrid={this.state.usrid} listView={this.state.listView}/> : <RegisterForm/>}
            </div>
        )
    }
}

export default App;

