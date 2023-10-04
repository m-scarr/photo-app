import React, { Component, createRef } from 'react';
import Album from '../components/Album';
import Button from '../components/Button';

class Albums extends Component {

    constructor(props) {
        super(props);
    }
    fileInputRef = React.createRef();
    state = {
        newAlbumName: "",
        showNameInput: false
    }
    styles = {
        container: {
            display: "flex",
            flexFlow: "row wrap"
        },
        albumContainer: {
            width: "calc(50% - 4px)",
            padding: 2
        },
        uploadButton: {
            width: "100%",
            marginBottom: 6
        },
        newAlbumNameInput: {
            width: "calc(100% - 16px)",
            textAlign: "center",
            marginBottom: "6px",
            fontSize: this.props.settings.fontSize
        }
    }

    onFileInputChange(e) {
        this.props.apiCall.create("upload", { target: e.target.parentElement, albumId: this.props.content[0].id }, () => { this.props.changeView("upload") })
    }

    handleCreateAlbumClick(e) {
        if (this.state.newAlbumName === "" && this.state.showNameInput) {
            this.setState({ showNameInput: false });
        } else if (!this.state.showNameInput) {
            this.setState({ showNameInput: true, newAlbumName: "" }, () => {
                e.target.children[1].focus();
            })
        } else {
            this.props.apiCall.create("album", { name: this.state.newAlbumName });
            this.setState({ showNameInput: false, newAlbumName: "" });
        }
    }

    render() {
        return (<div style={this.styles.container}>
            <form>
                <input name="image" type="file" ref={this.fileInputRef} style={{ display: "none" }} onChange={this.onFileInputChange.bind(this)} multiple />
            </form>
            <Button style={this.styles.uploadButton} settings={this.props.settings} onClick={() => { this.fileInputRef.current.click() }}>Upload Image(s)</Button>
            <Button style={this.styles.uploadButton} settings={this.props.settings} onClick={(e) => { this.handleCreateAlbumClick(e) }}>
                Create Album<br />{this.state.showNameInput ?
                    <input type="text" style={this.styles.newAlbumNameInput} placeholder="New Album Name" value={this.state.newAlbumName} onChange={(e) => { this.setState({ newAlbumName: e.target.value }) }} /> : null}
            </Button>
            {this.props.content.map((album) => {
                return (
                    <div style={this.styles.albumContainer} key={"album" + album.id} onClick={() => { this.props.openPhotos(album.id) }}>
                        <Album content={album} settings={this.props.settings} />
                    </div>
                )
            })
            }
        </div>);
    }
}

export default Albums;