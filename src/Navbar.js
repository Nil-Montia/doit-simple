import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from "./LoginForm";

class Navbar extends Component {

    render() {
        let loginForm = <LoginForm className="ml-auto" login={this.props.login}/>;
        let greeting = <span className={"ml-auto text-light"}>Welcome, {this.props.username}
            <button className={"btn btn-primary ml-3"} onClick={this.props.signout}>Sign out</button></span>;


        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
                <a className="navbar-brand" href="#">Doit</a>
                {this.props.loggedin ? greeting : loginForm}
            </nav>
        );
    }
}

export default Navbar;
