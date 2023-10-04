import React, { Component } from 'react';
import Center from './Center';
import NoImage from "../../assets/noimage.png"

class Album extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        imageHeight: 0
    }
    styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            border: "2px solid " + this.props.settings.color.getString(),
            borderRadius: 16
        },
        header: {
            textAlign: "center",
            height: this.props.settings.fontSize,
            padding: 4
        },
        img: {
            width: "100%",
            objectFit: "cover"
        },
        footer: {
            height: this.props.settings.fontSize * 3,
            textAlign: "center",
            padding: 4,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: 4
        }
    }
    containerRef = React.createRef();

    componentDidMount() {
        this.setState({ imageHeight: this.containerRef.current.clientWidth })
        window.addEventListener("resize", () => {
            if (this.containerRef.current !== null) {
                this.setState({ imageHeight: this.containerRef.current.clientWidth })
            }
        })
    }

    render() {
        return (
            <div ref={this.containerRef} style={this.styles.container}>
                <header style={this.styles.header}>{this.props.content.name}</header>
                <img style={{ ...this.styles.img, height: this.state.imageHeight }} alt="Album Cover" src={(typeof this.props.content.photos === "undefined" || this.props.content.photos.length === 0 ? NoImage : "http://localhost:3001/uploads/" + this.props.content.photos[0].photoRef)} />
                <footer style={this.styles.footer}>
                    {typeof this.props.content.description === "undefined" || this.props.content.description === "" || this.props.content.description === null ?
                        <Center style={{ color: "gray" }}>No Description</Center>
                        : <Center>{this.props.content.description}</Center>}
                </footer>
            </div>
        );
    }
}

export default Album;