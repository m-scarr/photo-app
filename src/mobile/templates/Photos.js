import React, { Component, createRef } from 'react';
import Photo from '../components/Photo';
import Button from '../components/Button';

class Photos extends Component {

    constructor(props) {
        super(props);
    }
    fileInputRef = React.createRef();
    state = {
    }
    styles = {
        container: {
            display: "flex",
            flexFlow: "row wrap"
        },
        photoContainer: {
            width: "calc(50% - 4px)",
            padding: 2
        },
        uploadButton: {
            width: "100%",
            marginBottom: 6
        },
    }

    onFileInputChange(e) {
        this.props.apiCall.create("upload", { target: e.target.parentElement, albumId: this.props.content.id }, () => { this.props.changeView("upload") })
    }

    render() {
        return (<div style={this.styles.container}>
            <form>
                <input name="image" type="file" ref={this.fileInputRef} style={{ display: "none" }} onChange={this.onFileInputChange.bind(this)} multiple />
            </form>
            <Button style={this.styles.uploadButton} settings={this.props.settings} onClick={() => { this.fileInputRef.current.click() }}>Upload Image(s)</Button>
            {this.props.content.photos.map((photo) => {
                return (
                    <div style={this.styles.photoContainer} key={"photo" + photo.id}>
                        <Photo content={photo} settings={this.props.settings} />
                    </div>
                )
            })
            }
        </div>);
    }
}

export default Photos;