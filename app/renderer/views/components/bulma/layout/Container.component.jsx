import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Container extends Component {
    render() {

        var containerClass = classNames('container', this.props.className, {
            'is-fluid': this.props.isFluid,
            'has-text-centered': this.props.hasTextCentered
        });

        return (
            <div className={containerClass} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}

Container.propTypes = {
    'is-fluid': PropTypes.bool,
    'has-text-centered': PropTypes.bool,
}

export default Container;