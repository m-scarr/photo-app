import React, { Component } from "react";

class Center extends Component {
  constructor(props) {
    super(props);
    this.style = {
      display: "table",
      width: "100%",
      height: "100%",
    };
    this.contentStyle = {
      display: "table-cell",
      verticalAlign: "middle",
      textAlign: "center",
    };
  }
  render() {
    return (
      <div
        style={{ ...this.style, ...this.props.style }}
        onClick={(e) => {
          if (typeof this.props.onClick === "function") {
            this.props.onClick(e);
          }
        }}
      >
        <div style={this.contentStyle}>{this.props.children}</div>
      </div>
    );
  }
}

export default Center;
