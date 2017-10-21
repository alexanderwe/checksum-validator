import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Button extends Component {
    render() {

        var { isWhite,
            isLight,
            isDark,
            isBlack,
            isLink,
            isPrimary,
            isInfo,
            isSuccess,
            isWarning,
            isDanger,
            isSmall,
            isMedium,
            isLarge,
            isOutLined,
            isInverted,
            isHovered,
            isFocused,
            isActive,
            isLoading,
            isStatic,
            isDelete,
            disabled,
            icon,
            as, ...other } = this.props;

        var buttonClass = classNames('button', this.props.className, {
            "is-white": isWhite,
            "is-light": isLight,
            "is-dark": isDark,
            "is-black": isBlack,
            "is-link": isLink,
            "is-primary": isPrimary,
            "is-info": isInfo,
            "is-success": isSuccess,
            "is-warning": isWarning,
            "is-danger": isDanger,
            "is-small": isSmall,
            "is-medium": isMedium,
            "is-large": isLarge,
            "is-outlined": isOutLined,
            "is-inverted": isInverted,
            "is-hovered": isHovered,
            "is-focued": isFocused,
            "is-active": isActive,
            "is-loading": isLoading,
            "is-static": isStatic,
            "delete": isDelete,
        });

        return (
            <a className={buttonClass} {...other}>
                {icon ? icon : null}
                {this.props.children}
            </a>
        );
    }
}

Button.propTypes = {
    isWhite: PropTypes.bool,
    isLight: PropTypes.bool,
    isDark: PropTypes.bool,
    isBlack: PropTypes.bool,
    isLink: PropTypes.bool,
    isPrimary: PropTypes.bool,
    isInfo: PropTypes.bool,
    isSuccess: PropTypes.bool,
    isWarning: PropTypes.bool,
    isDanger: PropTypes.bool,
    isSmall: PropTypes.bool,
    isMedium: PropTypes.bool,
    isLarge: PropTypes.bool,
    isOutlined: PropTypes.bool,
    isInverted: PropTypes.bool,
    isHovered: PropTypes.bool,
    isFocued: PropTypes.bool,
    isActive: PropTypes.bool,
    isLoading: PropTypes.bool,
    isStatic: PropTypes.bool,
    isDelete: PropTypes.bool,
}


export default Button;