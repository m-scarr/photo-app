import React, { Component } from "react";
import Center from "../components/Center";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      input: {
        width: "80%",
        textAlign: "center",
        border: "2px solid " + props.settings.color.getString(),
        fontSize: this.props.settings.fontSize,
        borderRadius: 16,
        margin: 8
      }
    }
  }
  state = {};

  componentDidMount() {

  }
  render() {
    return (
      <Center>
        <div>
          Log In
          <hr style={{ border: "2px solid " + this.props.settings.color.getString(), }} />
          <input
            type="text"
            placeholder="Username"
            value={this.props.content.logInName}
            style={this.styles.input}
            onChange={(e) => {
              this.props.updateView("logIn", "logInName", e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Password"
            value={this.props.content.password}
            style={this.styles.input}
            onChange={(e) => {
              this.props.updateView("logIn", "password", e.target.value);
            }}
          />
          <br />
          <button
            style={this.styles.input}
            onClick={() => {
              this.props.apiCall.auth("logIn", this.props.content, () => {
                this.props.openFeed();
              });
            }}
          >
            Log In
          </button>
          <br />
          <button
            style={this.styles.input}
            onClick={() => {
              this.props.changeView("register");
            }}
          >
            Create an Account
          </button>
        </div>
      </Center>
    );
  }
}

export default LogIn;
