import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from "./StatusButton";

class InputRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: ["Description", "Status", "dueDate"]
        };
    }

    makeInput(field){
        if (field==="Status"){
            return <Button/>;
        }else{
            let dictionary = {Description: "text", dueDate: "date"};
            return (
                <input type={dictionary[field]} placeholder={`Enter ${field}`} onKeyDown={this.update} value={this.state.info} onChange={this.transcribe}/>
            )
        }
    }

    render() {

        return (
            <tr className={"bg-secondary"}>
                <td><button type="button" className="btn btn-light btn-sm">+</button></td>
                {this.state.fields.map((field) => (<td>{this.makeInput(field)}</td>))}
            </tr>
        )
    }
}

export default InputRow;