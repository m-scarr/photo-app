import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    defaults = {
        border: "2px solid " + this.props.settings.color.getString(),
        backgroundColor: "white",
        fontSize: this.props.settings.fontSize,
        borderRadius: 16,
    }

    render() {
        return (<button {...{
            ...this.props, ...{
                style: {
                    ...this.props.style,
                    ...this.defaults
                }
            }
        }}>{this.props.children}</button>);
    }
}

export default Button;