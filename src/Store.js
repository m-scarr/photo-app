import React, { Component } from "react";
import _state from "./state";
import api from "./api"
import App from "./App";

class Store extends Component {

  constructor(props) {
    super(props);
  }

  state = { ..._state};

  componentDidMount() {
    this.apiCall("isLoggedIn",{})
  }

  apiCall(func, data, cb) {
    api[func](this.state,(state,_cb)=>{this.setState({...state},_cb)},data,cb);
  }

  render() {
    return <div>
        <App store={{...this.state}} updateStore={(state)=>{this.setState(state)}} apiCall={this.apiCall.bind(this)}/>
    </div>;
  }
}

export default Store;
