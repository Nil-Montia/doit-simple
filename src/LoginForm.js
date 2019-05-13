import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state={
            usernm:"",
            passwd:"",
            failedLogin:this.props.failedLogin
        }
    }

    transcribeUser = (e) => {
        this.setState({
            usernm: e.target.value
        })
    };

    transcribePasswd = (e) => {
        this.setState({
            passwd: e.target.value
        })
    };

    handleLogin = (e) => {
        e.preventDefault();
        this.props.login(this.state.usernm,this.state.passwd);
    };

    render(){
        let valid = this.props.failedLogin ? "is-invalid": "";

        return(
            <form className="form-row ml-auto" onSubmit={this.handleLogin}>
                <div className="form-row ml-auto">
                    <div className="col">
                        <input type="text" className={"form-control " + valid} placeholder="Enter username" onChange={this.transcribeUser} onClick={() => this.props.setFailedLogin(false)}/>
                        <div className="invalid-tooltip">
                            Wrong username and password combination.
                        </div>
                    </div>
                    <div className="col">
                        <input type="password" className="form-control" placeholder="Enter password" onChange={this.transcribePasswd} onClick={() => this.props.setFailedLogin(false)}/>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary mb-2">Sign in</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default LoginForm;