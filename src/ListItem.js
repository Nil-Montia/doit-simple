import React, { Component } from 'react';

class ListItem extends Component{
    constructor(props){
        super(props);
        this.state={
            text: props.text||"whoops"
        };
    };

    render(){
        return(<div style={{background :this.state.background}}>{this.state.text}
        </div>)
    }
}

export default ListItem;