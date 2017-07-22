import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from './Button.component';
class Notification extends Component {
    render() {


        var {
            isPrimary,
            isInfo,
            isSuccess,
            isWarning,
            isDanger,
            onCloseClick,
            ...other } = this.props;

        var notificationClass = classNames('notification', this.props.className, {
            "is-primary": isPrimary,
            "is-info": isInfo,
            "is-success": isSuccess,
            "is-warning": isWarning,
            "is-danger": isDanger,
        });


        return (
            <div className={notificationClass} {...other}>
                <Button isDelete style={{ paddingLeft: "0px", paddinRight: "0px" }} onClick={onCloseClick} />
                {this.props.children}
            </div>
        );
    }
}

Notification.PropTypes = {
    isPrimary: PropTypes.bool,
    isInfo: PropTypes.bool,
    isSuccess: PropTypes.bool,
    isWarning: PropTypes.bool,
    isDanger: PropTypes.bool,
    onCloseClick: PropTypes.func
}


export default Notification;