import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text || "whoops",
            isInput: false
        };
    };

    display = (e) => {
        if (e.key === "Enter") {
            this.props.update(this.props.taskID, this.state.text)
            this.setState({
                isInput: false
            })
        }
    };

    mobileDisplay = () => {
        this.props.update(this.props.taskID, this.state.text)
        this.setState({
            isInput: false
        })
    }

    transcribe = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    render() {

        let item = <div>
                <span onClick={() => {this.setState({isInput: true})}}>{this.props.text}</span>
                <button className={"button btn-small btn-danger mr-auto"}
                        onClick={() => {this.props.delete(this.props.taskID)}}>
                 -
                </button>
        </div>;

        let input = <span><input type={"text"}className={"form-control"} placeholder={"Input description"}
                                 onChange={this.transcribe} onKeyDown={this.display} value={this.state.text}/><button className={"d-md-none btn btn-dark"} onClick={this.mobileDisplay}>Update</button></span>;
        return (<div>
            {!this.state.isInput ? item : input}
        </div>)
    }
}

export default ListItem;