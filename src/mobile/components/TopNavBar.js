import React, { Component } from "react";
import Center from "./Center";
import SearchIcon from "../../assets/search.png";
import ArrowRight from "../../assets/arrow_right.png"

class TopNavBar extends Component {
    constructor(props) {
        super(props);
        this.style = {
            display: "flex",
            height: 64,
            backgroundColor: this.props.settings.color.getString(),
            color: "white",
            fontSize: this.props.settings.fontSize * 1.2,
            position: "fixed",
            top: 0,
            right: 0,
            left: 0
        };
        this.iconStyle = {
            height: 48,
            margin: 8,
        };
    }
    styles = {
        container: {
            display: "flex",
            height: 64,
            backgroundColor: this.props.settings.color.getString(),
            color: "white",
            fontSize: this.props.settings.fontSize * 1.2,
            position: "fixed",
            top: 0,
            right: 0,
            left: 0
        },
        nameContainer: {
            width: "calc(100% - 128px)"
        },
        icon: { height: 48, margin: 8 }
    }

    componentDidMount() {
        //this.style.backgroundColor = this.props.settings.color.getString(0,0,0);
    }

    render() {
        return (
            <nav style={this.styles.container}>
                <img
                    src={ArrowRight}
                    style={{ ...this.styles.icon, transform: "scaleX(-1)" }}
                    onClick={() => {
                        this.props.back();
                    }}
                />
                <Center style={this.styles.nameContainer}>Photo App</Center>
                {this.props.currentView === "search" ? (
                    <div style={{ width: 60 }} />
                ) : (
                    <img
                        src={SearchIcon}
                        style={this.styles.icon}
                        onClick={() => {
                            this.props.openSearch();
                        }}
                    />
                )}
            </nav>
        );
    }
}

export default TopNavBar;
