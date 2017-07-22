import React, { Component } from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';

class Icon extends Component {
    render() {

        var { isSmall,
            isMedium,
            isLarge,
            isLeft,
            isRight,
            name, ...other } = this.props;

        var iconClass = classNames('icon', this.props.className, {
            'is-small': isSmall,
            'is-medium': isMedium,
            'is-large': isLarge,
            'is-left': isLeft,
            'is-right': isRight,
        });
        return (
            <span className={iconClass} {...other}>
                <i className={"nc-icon " + name}></i>
            </span>
        );
    }
}

Icon.PropTypes = {
    isSmall: PropTypes.bool,
    isMedium: PropTypes.bool,
    isLarge: PropTypes.bool,
    isLeft: PropTypes.bool,
    isRight: PropTypes.bool,
    name: PropTypes.string,
}

export default Icon;