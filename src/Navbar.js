import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from "./LoginForm";

class Navbar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
                <a className="navbar-brand" href="#">Doit</a>
                <LoginForm className="ml-auto" login={this.props.login}/>
            </nav>
        );
    }
}

export default Navbar;
