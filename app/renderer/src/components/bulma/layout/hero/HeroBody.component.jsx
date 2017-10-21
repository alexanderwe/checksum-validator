import React, { Component } from 'react';

class HeroBody extends Component {
    render() {

        var {
            ...other
        } = this.props;

        return (
            <div className="hero-body" {...other}>
                {this.props.children}
            </div>
        );
    }
}

export default HeroBody;