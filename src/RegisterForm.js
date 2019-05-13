import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './register-form.css';
import {BACKEND_URL} from './api-config';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "none",
            password: "none",
            existingUser: false,
            registered:false
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


    createUser = () => {
        const request = new XMLHttpRequest();
        const url = `http://${BACKEND_URL}:8082/user/create`;
        if ((this.state.username !== "") && (this.state.password !== "")) {
            request.open("POST", url);
            request.responseType = 'json';
            request.setRequestHeader("content-Type", "application/json");
            let body;
            body = JSON.stringify({username: this.state.username, password: this.state.password})
            request.onload = () => {
                console.log(request.response);
                if (request.response === 1) {
                    this.setState({
                        registered: true
                    })
                } else {
                    this.setState({
                        existingUser: true
                    })
                }
            };
            request.send(body);
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.createUser();
    };

    render() {
        let error = <small className="form-text text-danger">User already exists</small>;
        let success = <small className="form-text text-success">Registration successful</small>;
        return (
            <div className={"card col-7"}>
                <h1>Register form</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" id="inputUsername" placeholder="Enter username"
                               onClick={() => {
                                   this.setState({existingUser: false})
                               }} onChange={this.transcribeUser}/>
                        {this.state.existingUser ? error : null}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Enter password"
                               onChange={this.transcribePassword}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {this.state.registered ? success : null}
                </form>
            </div>
        )
    }
}

export default RegisterForm;