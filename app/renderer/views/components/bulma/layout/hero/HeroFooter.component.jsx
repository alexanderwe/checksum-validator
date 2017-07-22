import React, { Component } from 'react';

class HeroFooter extends Component {
    render() {


        var {
            ...other
        } = this.props;

        return (
            <div className="hero-footer" {...other}>
                {this.props.children}
            </div>
        );
    }
}

export default HeroFooter;