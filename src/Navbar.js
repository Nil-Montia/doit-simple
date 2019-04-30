import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Navbar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
                <a className="navbar-brand" href="#">Doit</a>
            </nav>
        );
    }
}

export default Navbar;
