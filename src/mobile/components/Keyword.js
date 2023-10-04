import React, { Component } from 'react'

export default class Keyword extends Component {
  render() {
    return (
        <div
        onContextMenu={(e) => {
            e.preventDefault();
            this.props.apiCall.delete("keyword", this.props.keyword)
        }}
    >{this.props.keyword.word}</div>
    )
  }
}
