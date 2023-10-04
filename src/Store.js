import React, { Component } from "react";
import _state from "./state";
import api from "./api"
import _functions from "./functions";
import { BrowserView, MobileView } from 'react-device-detect';
import MobileApp from "./mobile/App";

class Store extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settings: {
        color: {
          r: 0,
          g: 205,
          b: 150,
          getString: (r, g, b) => {
            return (
              "rgb(" +
              (typeof r === "undefined" ? this.state.settings.color.r : r) +
              ", " +
              (typeof g === "undefined" ? this.state.settings.color.g : g) +
              ", " +
              (typeof b === "undefined" ? this.state.settings.color.b : b) +
              ")"
            );
          },
        },
        fontSize: 24,
      },
    }
  }

  componentDidMount() {
    this.setState({ ..._state }, () => {
      window.addEventListener("resize", () => {
        this.setState({
          orientation:
            window.innerHeight > window.innerWidth ? "portrait" : "landscape",
          viewingFrame: { width: window.innerWidth, height: window.innerHeight - 128 }
        });
      });
      _functions.init(this.state, this.setState.bind(this));
    })
  }

  componentDidUpdate(prevProps, prevState) {
    //if (prevState.currentView !== this.state.currentView) {
    //  console.log(this.state.views[this.state.currentView])
    //}
    if (prevState !== this.state) {
      this.functions.updateState(this.state)
    }
  }

  apiCall = {
    auth: (func, data, cb) => {
      api.auth[func](this.state, this.setState.bind(this), data, cb);
    },
    create: (func, data, cb) => {
      api.create[func](this.state, this.setState.bind(this), data, cb);
    },
    read: (func, data, cb) => {
      api.read[func](this.state, this.setState.bind(this), data, cb);
    },
    update: (func, data, cb) => {
      api.update[func](this.state, this.setState.bind(this), data, cb);
    },
    delete: (func, data, cb) => {
      api.delete[func](this.state, this.setState.bind(this), data, cb);
    }
  }

  functions = { ..._functions }

  render() {
    return <div>
      <MobileView>
        <MobileApp store={{ ...this.state }} updateStore={this.setState.bind(this)} apiCall={this.apiCall} functions={this.functions} />
      </MobileView>
      <BrowserView>
        <MobileApp store={{ ...this.state }} updateStore={this.setState.bind(this)} apiCall={this.apiCall} functions={this.functions} />
      </BrowserView>
    </div>;
  }
}

export default Store;
