import React, { Component } from 'react';

class HeroHeader extends Component {
    render() {

        var {
            ...other
        } = this.props;

        return (
            <div className="hero-header" {...other}>
                {this.props.children}
            </div>
        );
    }
}

export default HeroHeader;