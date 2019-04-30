import React, {Component} from 'react';
import ListItem from "./ListItem";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "something",
      arr: [],
      id:1
    }
  }

  loadListItems = () =>{
    const request = new XMLHttpRequest();
    const url='http://localhost:8080/task/getAll';
    request.open("GET", url);
    request.responseType='json';
    request.setRequestHeader("content-Type","application/json")
    request.onload=(e)=>{
      let list=request.response;
      this.setState({
        arr:list
      })
    };
    request.send();
  };

  componentDidMount() {
    this.loadListItems();
  }

  create = (text) => {
    const request = new XMLHttpRequest();
    const url='http://localhost:8080/task/create';
    request.open("POST", url);
    request.responseType='json';
    request.setRequestHeader("content-Type","application/json")
    let body=JSON.stringify({description:text})
    request.onload=(e)=>{
      console.log(request.status)
      this.loadListItems()
    };
    request.send(body);
  }

  show = () => {
    this.create(this.state.text);
  }

  transcribe = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  render() {
    return (<div className={"card"}>
      <Navbar/>
      <input className={"form-control"} type={"text"} placeholder={"Enter task"} onChange={this.transcribe}/>
      <button type={"submit"} onClick={this.show}>Submit</button>
      {this.state.arr.map((item, index) => <ListItem className={"self-align-center"} key={"item"+index} text={item.description}/>)}
    </div>);
  }
}

export default App;
