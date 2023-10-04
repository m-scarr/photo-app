import React, { Component } from 'react'

export default class PhotoSearchResult extends Component {

  styles = {
    image: {
      width: "100%",
      borderRadius: 4,
      margin: 0
    },
    container: {
      width: "100% - 20px",
      border: "2px solid " + this.props.settings.color.getString(),
      borderRadius: 16,
      padding: 8,
      paddingBottom: 2
    }
  }

  render() {
    return (
      <div style={this.styles.container}>
        <img style={this.styles.image} alt={this.props.content.description} src={"http://localhost:3001/uploads/" + this.props.content.photoRef} />
      </div>
    )
  }
}

