import React, { Component } from 'react'
import Dashboard from './Dashboard';
import LogIn from './LogIn';
import Register from './Register';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  updateView(view, field, value) {
    var views = { ...this.props.store.views };
    views[view][field] = value;
    this.props.updateStore({ views })
  }

  changeView(currentView) {
    this.props.updateStore({ currentView })
  }
  
  render() {
    return (<div>
      {this.props.store.currentView === "dashboard" ?
        <Dashboard content={this.props.store.user} updateView={this.updateView.bind(this)} changeView={this.changeView.bind(this)} apiCall={this.props.apiCall.bind(this)} />
        : null}
      {this.props.store.currentView === "logIn" ?
        <LogIn content={this.props.store.views.logIn} updateView={this.updateView.bind(this)} changeView={this.changeView.bind(this)} apiCall={this.props.apiCall.bind(this)} />
        : null}
      {this.props.store.currentView === "register" ?
        <Register content={this.props.store.views.register} updateView={this.updateView.bind(this)} changeView={this.changeView.bind(this)} apiCall={this.props.apiCall.bind(this)} />
        : null}
    </div>);
  }
}

export default App;
