import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Field extends Component {

    render() {

        var { hasAddons,
            hasIconsLeft,
            hasIconsRight,
            ...other } = this.props;

        var fieldClass = classNames('field', this.props.className, {
            'has-addons': hasAddons
        });

        var controlClass = classNames('control', {
            'has-icons-left': hasIconsLeft,
            'has-icons-right': hasIconsRight
        });

        return (
            <div className={fieldClass} {...other}>
                <div className={controlClass}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Field.PropTypes = {
    hasAddons: PropTypes.bool,
    hasIconsLeft: PropTypes.bool,
    hasIconsRight: PropTypes.bool
}

export default Field;