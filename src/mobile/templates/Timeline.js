import React, { Component } from "react";
import Center from "../components/Center";
import ProfileIcon from "../../assets/profile.png";
import ArrowIcon from "../../assets/arrow_right.png";
import Post from "../components/Post";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.style = {
            color: this.props.settings.color.getString(
                this.props.settings.color.r / 2,
                this.props.settings.color.g / 2,
                this.props.settings.color.b / 2
            ),
            textAlign: "center",
        };
        this.namePlateStyle = {
            display: "flex",
            margin: 8,
            height: 128,
            padding: 1,
            borderRadius: 65,
            fontSize: this.props.settings.fontSize,
        };
        this.profilePhotoStyle = {
            width: 192,
            height: 128,
            borderRadius: 64,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
        };
        this.infoContainerStyle = {
            textAlign: "center",
        };
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div style={this.style}>
                <div style={this.namePlateStyle}>
                    <div
                        style={
                            this.props.content.profilePhoto !== null
                                ? {
                                    ...this.profilePhotoStyle,
                                    backgroundImage:
                                        "url('http://localhost:3001/Uploads/" +
                                        this.props.content.profilePhoto.photoRef +
                                        "')",
                                } :
                                {
                                    ...this.profilePhotoStyle,
                                    backgroundImage: `url(${ProfileIcon})`,
                                    backgroundColor: this.props.settings.color.getString(),
                                }
                        }
                    />
                    <Center>{this.props.content.displayName}</Center>
                </div>
                <div style={this.infoContainerStyle}>
                    <div style={this.infoItemContainerStyle}>
                        <strong> E-mail:</strong>
                        <br />
                        {this.props.content.email}
                        <hr />
                    </div>
                    <div style={this.infoItemContainerStyle}>
                        <strong>Phone:</strong>
                        <br />
                        {this.props.content.phone}
                        <hr />
                    </div>
                    <div style={this.infoItemContainerStyle}>
                        <strong>Position:</strong>
                        <br />
                        {this.props.content.job}
                        <hr />
                    </div>
                    <div style={this.infoItemContainerStyle}>
                        <strong>Employer:</strong>
                        <br />
                        {this.props.content.employer}
                        <hr />
                    </div>
                    <div style={this.infoItemContainerStyle}>
                        <strong>About Me:</strong>
                        <br />
                        {this.props.content.aboutMe}
                        <hr />
                    </div>
                </div>
                <div
                    style={{
                        fontSize: this.props.settings.fontSize * 1.2,
                        marginTop: 32,
                    }}
                >
                    My Timeline
                </div>
                <hr />
                {this.props.content.timeline.map((post, i) => {
                    return (
                        <Post
                            content={post}
                            key={"timelinePost" + post.id}
                            settings={this.props.settings}
                            parseDateTime={this.props.parseDateTime}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Profile;