import React, { Component } from "react";
import FeedIcon from "../../assets/feed.png";
import PhotoIcon from "../../assets/photos.png";
import MessageIcon from "../../assets/messages.png";
import TimelineIcon from "../../assets/timeline.png";
import ProfileIcon from "../../assets/profile.png";
import Center from "./Center";

class BottomNavBar extends Component {
    constructor(props) {
        super(props);
        this.style = {
            display: "flex",
            height: 64,
            backgroundColor: this.props.settings.color.getString(),
            color: "white",
            fontSize: this.props.settings.fontSize * 1.2,
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0
        };
        this.buttonStyle = {
            width: "25%",
            marginTop: 3,
        };
        this.iconStyle = {
            height: 48,
        };
    }

    render() {
        return (
            <nav style={this.style}>
                <div
                    style={this.buttonStyle}
                    onClick={() => {
                        //this.props.changeView("profile");
                        this.props.openTimeline()
                    }}
                >
                    <Center>
                        <img style={this.iconStyle} src={ProfileIcon} />
                    </Center>
                </div>
                <div
                    style={this.buttonStyle}
                    onClick={() => {
                        this.props.openAlbums();
                    }}
                >
                    <Center>
                        <img style={this.iconStyle} src={PhotoIcon} />
                    </Center>
                </div>
                <div
                    style={this.buttonStyle}
                    onClick={() => {
                        this.props.openFeed()
                    }}
                >
                    <Center>
                        <img style={this.iconStyle} src={FeedIcon} />
                    </Center>
                </div>
                <div style={this.buttonStyle}>
                    <Center>
                        <img style={this.iconStyle} src={MessageIcon} />
                    </Center>
                </div>
            </nav>
        );
    }
}

export default BottomNavBar;
