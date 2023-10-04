import React, { Component } from 'react';
import Post from "../components/Post";

class Feed extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    state = {}
    render() {
        return (<div>
            {this.props.content.map((post) => {
                return <Post key={"post" + post.id} content={post} settings={this.props.settings} updateView={this.props.updateView} changeView={this.props.changeView} parseDateTime={this.props.parseDateTime} />
            })}
        </div>);
    }
}

export default Feed;