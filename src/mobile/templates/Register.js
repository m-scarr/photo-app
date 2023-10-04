import React, { Component } from "react";
import Center from "../components/Center";

class Register extends Component {
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
  render() {
    return (
      <Center>
        <div>
          Register
          <hr style={{ border: "2px solid " + this.props.settings.color.getString(), }} />
          <input
            type="text"
            placeholder="Username"
            value={this.props.content.logInName}
            style={this.styles.input}
            onChange={(e) => {
              this.props.updateView("register", "logInName", e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="E-mail"
            value={this.props.content.email}
            style={this.styles.input}
            onChange={(e) => {
              this.props.updateView("register", "email", e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Password"
            value={this.props.content.password}
            style={this.styles.input}
            onChange={(e) => {
              this.props.updateView("register", "password", e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Verify Password"
            value={this.props.content.verifyPassword}
            style={this.styles.input}
            onChange={(e) => {
              this.props.updateView("register", "verifyPassword", e.target.value);
            }}
          />
          <br />
          <button
            style={this.styles.input}
            onClick={() => {
              this.props.apiCall.auth("register", this.props.content);
            }}
          >
            Create Account
          </button>
          <br />
          <button
            style={this.styles.input}
            onClick={() => {
              this.props.changeView("logIn");
            }}
          >
            Log In
          </button>
        </div>
      </Center>
    );
  }
}

export default Register;
