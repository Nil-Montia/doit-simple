import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from "./LoginForm";


class Navbar extends Component {


    render() {
        let loginForm = <LoginForm className="ml-auto" login={this.props.login}/>;
        let greeting = <span className={"ml-auto text-light"}>Welcome, {this.props.username}
            <button className={"btn btn-primary ml-3"} onClick={this.props.signout}>Sign out</button></span>;

        let viewButtons = <span className={"navbar-link text-light ml-4"}><span className={"ml-5"}
                                                                                onClick={this.props.blockViewing}>Block view</span> <span
            className={"ml-3"} onClick={this.props.listViewing}>List view</span></span>;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
                <a className="navbar-brand mr-4" href="#">Doit</a>
                {this.props.loggedin ? viewButtons : ""}
                {this.props.loggedin ? greeting : loginForm}
            </nav>
        );
    }
}

export default Navbar;
