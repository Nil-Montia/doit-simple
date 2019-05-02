import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state={
            usernm:"",
            passwd:"",
            login:false
        }
    }

    transcribeUser = (e) => {
        this.setState({
            usernm: e.target.value
        })
        console.log(this.state.usernm)
    };

    transcribePasswd = (e) => {
        this.setState({
            passwd: e.target.value
        })
    };


    render(){
        return(
            <form className="form-row ml-auto">
                <div className="form-row ml-auto">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Enter username" onChange={this.transcribeUser}/>
                    </div>
                    <div className="col">
                        <input type="password" className="form-control" placeholder="Enter password" onChange={this.transcribePasswd}/>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-primary mb-2" onClick={()=>{this.props.login(this.state.usernm,this.state.passwd)}}>Sign in</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default LoginForm;