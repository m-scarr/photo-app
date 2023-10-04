import React, { Component } from "react";
import Center from "./Center";

class Post extends Component {
  constructor(props) {
    super(props);
    this.style = {
      margin: 8,
      border: "2px solid " + this.props.settings.color.getString(),
      borderRadius: 16,
      padding: 8,
      paddingBottom: 2,
    };
    this.profilePhotoStyle = { width: 62, height: 62, borderRadius: 31 };
    this.headerStyle = {
      height: 64,
      display: "flex",
      flexDirection: "row",
      fontSize:
        this.props.settings.fontSize * 0.75 > 20
          ? 20
          : this.props.settings.fontSize * 0.75,
      overflow: "hidden",
    };
    this.headerLeftStyle = { width: 64, height: 64 };
    this.headerMiddleStyle = { width: "calc(100% - 64px)", height: 64 };
    this.headerRightStyle = { width: 64, height: 64 };
    this.moreStyle = {
      marginLeft: 16,
      width: 48,
      height: 48,
      backgroundColor: this.props.settings.color.getString(),
      borderRadius: 32,
      color: "white",
      fontSize: this.props.settings.fontSize,
    };
    this.bodyStyle = { width: "100%", fontSize: this.props.settings.fontSize };
    this.photoContainerStyle = { marginTop: 4, width: "100%" };
    this.photoStyle = { borderRadius: 16, width: "100%" };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div style={this.style}>
        <header style={this.headerStyle}>
          <div style={this.headerLeftStyle}>
            {this.props.content.poster.profilePhoto !== null ? (
              <img
                onClick={() => {
                  this.props.updateView("photoViewer", this.props.content.poster.profilePhoto, () => {
                    this.props.changeView("photoViewer")
                  })
                }}
                style={this.profilePhotoStyle}
                alt="Profile Image"
                src={
                  "http://localhost:3001/uploads/" +
                  this.props.content.poster.profilePhoto.photoRef
                }
              />
            ) : null}
          </div>
          <div style={this.headerMiddleStyle}>
            <Center>
              <div onClick={() => {
                //this.props.openProfile(this.props.content.poster)
              }}>
                {this.props.content.poster.displayName}
                <br />
                {this.props.parseDateTime(
                  this.props.content.poster.createdAt
                )}
              </div>
            </Center>
          </div>
          <div style={this.headerRightStyle}>
            <div style={this.moreStyle}>
              <Center>
                <div
                  style={{ paddingBottom: this.props.settings.fontSize / 2, color: "white" }}
                >
                  ...
                </div>
              </Center>
            </div>
          </div>
        </header>
        <main style={this.bodyStyle}>
          {this.props.content.text}
          {this.props.content.photoId === null ? null : (
            <div style={this.photoContainerStyle} onClick={() => {
              this.props.updateView("photoViewer", this.props.content.photo, () => {
                this.props.changeView("photoViewer")
              })
            }}>
              <img
                style={this.photoStyle}
                alt="Posted Image"
                src={
                  "http://localhost:3001/Uploads/" +
                  this.props.content.photo.photoRef
                }
              />
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default Post;
