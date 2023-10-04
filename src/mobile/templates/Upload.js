import React, { Component } from 'react';
import Center from '../components/Center';
import Button from '../components/Button';
import Keyword from '../components/Keyword';

class Upload extends Component {
    constructor(props) {
        super(props);
    }
    state = {
    }
    styles = {
        header: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            marginBottom: "8px"
        },
        img: {
            width: "calc(100% - 32px)",
            height: "50%",
            objectFit: "contain",
            backgroundColor: "black",
            marginLeft: 4,
            marginRight: 4,
            marginBottom: 4
        },
        textArea: {
            width: "calc(100% - 5px)",
            height: this.props.settings.fontSize * 4,
            resize: "none",
        },
        keywordInput: {
            width: "calc(100% - 6px)"
        },
        imageContainer: {
            display: "flex",
            flexDirection: "row"
        },
        dropDown: {
            width: "100%",
            textAlign: "center",
        },
        addKeywordButton: {

        },
        keywordInputContainer: {
            display: "flex",
            flexDirection: "row"
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <header style={this.styles.header}><Center>Edit Uploads</Center><Button settings={this.props.settings} onClick={() => {
                    this.props.apiCall.update("photo",
                        {
                            id: this.props.content.photos[this.props.content.photoIndex].id,
                            albumId: this.props.content.photos[this.props.content.photoIndex].albumId,
                            description: this.props.content.photos[this.props.content.photoIndex].description
                        }
                    )
                    this.props.changeView("albums")
                }}>Done</Button></header>
                <div style={this.styles.imageContainer}>
                    <div onClick={() => {
                        this.props.apiCall.update("photo",
                            {
                                id: this.props.content.photos[this.props.content.photoIndex].id,
                                albumId: this.props.content.photos[this.props.content.photoIndex].albumId,
                                description: this.props.content.photos[this.props.content.photoIndex].description
                            }
                        )
                        var newIndex;
                        if (this.props.content.photoIndex > 0) {
                            newIndex = this.props.content.photoIndex - 1;
                        } else {
                            newIndex = this.props.content.photos.length - 1;
                        }
                        this.props.updateView("upload", "photoIndex", newIndex)
                    }}>
                        <Center>
                            &lt;
                        </Center>
                    </div>
                    <img
                        style={this.styles.img}
                        alt="Uploaded Image"
                        src={"http://localhost:3001/uploads/" + this.props.content.photos[this.props.content.photoIndex].photoRef} />
                    <div onClick={() => {
                        this.props.apiCall.update("photo",
                            {
                                id: this.props.content.photos[this.props.content.photoIndex].id,
                                albumId: this.props.content.photos[this.props.content.photoIndex].albumId,
                                description: this.props.content.photos[this.props.content.photoIndex].description
                            }
                        )
                        var newIndex;
                        if (this.props.content.photoIndex < this.props.content.photos.length - 1) {
                            newIndex = this.props.content.photoIndex + 1;
                        } else {
                            newIndex = 0;
                        }
                        this.props.updateView("upload", "photoIndex", newIndex)
                    }}>
                        <Center>
                            &gt;
                        </Center>
                    </div>
                </div>
                <div style={{ ...this.styles.dropDown, fontSize: this.props.settings.fontSize * .7 }}>Album:</div>
                <select style={this.styles.dropDown} onChange={(e) => { this.props.setPhotoAlbumId(e.target.value) }} value={this.props.content.photos[this.props.content.photoIndex].albumId}>
                    {this.props.albums.map((album) => {
                        return <option key={"albumOption" + album.id} value={album.id}>{album.name}</option>
                    })}
                </select>
                <div style={{ fontSize: this.props.settings.fontSize * .7, textAlign: "center", marginTop: 16 }}>Description:</div>
                <textarea style={this.styles.textArea} value={this.props.content.photos[this.props.content.photoIndex].description} onChange={(e) => { this.props.setPhotoDescription(e.target.value) }} />
                <div style={{ fontSize: this.props.settings.fontSize * .7, textAlign: "center", marginTop: 16 }}>Keywords:</div>
                <div style={this.styles.keywordInputContainer}>
                    <input style={this.styles.keywordInput} type="text" placeholder="New Keyword" onChange={(e) => {
                        var val = e.target.value;
                        e.target.value = val.replace(/\s/g, '');
                    }} />
                    <button style={this.styles.addKeywordButton} onClick={(e) => {
                        var word = { word: e.nativeEvent.target.parentElement.children[0].value, photoId: this.props.content.photos[this.props.content.photoIndex].id }
                        this.props.apiCall.create("keyword", word)
                    }}>Add Keyword</button>
                </div>
                <div style={this.styles.keywordsContainer}>
                    {this.props.content.photos[this.props.content.photoIndex].keywords.map((keyword) => {
                        return <Keyword key={"keyword" + keyword.id} keyword={keyword} apiCall={this.props.apiCall} />
                    })}
                </div>
            </div>
        );
    }
}

export default Upload;