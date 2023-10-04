import React, { Component } from "react";
import Center from "./Center";
import ArrowIcon from "../../assets/arrow_right.png";
import ProfileIcon from "../../assets/profile.png";

class UserSearchResult extends Component {
  constructor(props) {
    super(props);
    this.style = {
      display: "flex",
      margin: 8,
      border: "2px solid " + this.props.settings.color.getString(),
      height: 48,
      padding: 1,
      borderRadius: 25,
      fontSize: this.props.settings.fontSize,
    };
    this.profilePhotoStyle = {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
    this.goToButtonStyle = {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: this.props.settings.color.getString(),
      color: "white",
      textAlign: "center",
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div style={this.style}>
        <div
          style={
            this.props.content.profilePhoto !== null
              ? {
                  ...this.profilePhotoStyle,
                  backgroundImage:
                    "url('http://localhost:3001/Uploads/" +
                    this.props.content.profilePhoto.photoRef +
                    "')",
                }
              : {
                  ...this.profilePhotoStyle,
                  backgroundImage: `url(${ProfileIcon})`,
                  backgroundColor: this.props.settings.color.getString(),
                }
          }
        />
        <Center
          style={{ width: "calc(100% - 96px)" }}
          content={this.props.content.displayName}
        />
        <div style={this.goToButtonStyle}>
          <Center
            content={
              <img
                src={ArrowIcon}
                style={{ marginTop: 6, width: 32, height: 32 }}
              />
            }
          />
        </div>
      </div>
    );
  }
}

export default UserSearchResult;
