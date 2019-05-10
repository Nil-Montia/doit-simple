import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './register-form.css';
import { BACKEND_URL } from './api-config';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:"none",
            password:"none"
        }

    }
    transcribeUser = (e) => {
        this.setState({
            username: e.target.value
        })
    };
    transcribePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    };


    createUser =() => {
        const request = new XMLHttpRequest();
        const url = `http://${BACKEND_URL}:8082/user/create`;
        if ((this.state.username!=="")&&(this.state.password!=="")){
            request.open("POST", url);
            request.responseType = 'json';
            request.setRequestHeader("content-Type", "application/json")
            let body;
            body = JSON.stringify({username: this.state.username, password: this.state.password})
            request.onload = (e) => {
                console.log(request.response);
                if(request.response===1){
                    window.alert("Registration successful")
                }else{
                    window.alert("User already exists")
                }
            };
            request.send(body);
        }
    };

    render() {
        return (
            <div className={"card col-7"}>
                <h1>Register form</h1>
            <form>
                <div className="form-group">
                    <label>Username</label>
                    <input type="email" className="form-control" id="inputUsername" placeholder="Enter username" onChange={this.transcribeUser}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Enter password" onChange={this.transcribePassword}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.createUser}>Submit</button>
            </form>
            </div>
        )
    }
}

export default RegisterForm;