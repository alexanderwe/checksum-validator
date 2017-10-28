import * as classNames from 'classnames';
import * as React from 'react';
import Button from './Button.component';

interface INotificationProps {
    isPrimary?: boolean;
    isInfo?: boolean;
    isSuccess?: boolean;
    isWarning?: boolean;
    isDanger?: boolean;
    className?: string;
    style?: object;
    onCloseClick: () => void;
}

class Notification extends React.Component<INotificationProps, any> {
    public render() {
        const { isPrimary, isInfo, isSuccess, isWarning, isDanger, onCloseClick, ...other } = this.props;

        const notificationClass = classNames('notification', this.props.className, {
            'is-danger': isDanger,
            'is-info': isInfo,
            'is-primary': isPrimary,
            'is-success': isSuccess,
            'is-warning': isWarning,
        });

        return (
            <div className={notificationClass} {...other}>
                <Button isDelete style={{ paddingLeft: '0px', paddinRight: '0px' }} onClick={onCloseClick} />
                {this.props.children}
            </div>
        );
    }
}

export default Notification;
