import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Container extends Component {
    render() {
        var containerClass = classNames('container', this.props.className, {
            'is-fluid': this.props.isFluid,
            'has-text-centered': this.props.hasTextCentered,
            'is-marginless': this.props.isMarginless
        });

        return (
            <div className={containerClass} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}

Container.propTypes = {
    isFluid: PropTypes.bool,
    hasTextCentered: PropTypes.bool,
    isMarginless: PropTypes.bool
};

export default Container;
