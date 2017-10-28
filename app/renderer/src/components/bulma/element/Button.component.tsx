import * as classNames from 'classnames';
import * as React from 'react';

interface IButtonProps {
    as?: string;
    className?: string;
    disabled?: boolean;
    icon?: JSX.Element;
    isActive?: boolean;
    isBlack?: boolean;
    isDanger?: boolean;
    isDark?: boolean;
    isDelete?: boolean;
    isFocused?: boolean;
    isHovered?: boolean;
    isInfo?: boolean;
    isInverted?: boolean;
    isLarge?: boolean;
    isLight?: boolean;
    isLink?: boolean;
    isLoading?: boolean;
    isMedium?: boolean;
    isOutLined?: boolean;
    isPrimary?: boolean;
    isSmall?: boolean;
    isStatic?: boolean;
    isSuccess?: boolean;
    isWarning?: boolean;
    isWhite?: boolean;
    onClick?: () => void ;
    style?: object;
    children?: string;

}

class Button extends React.Component<IButtonProps, any> {
    public render() {
        const { isWhite,
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

        const buttonClass = classNames('button', this.props.className, {
            'delete': isDelete,
            'is-active': isActive,
            'is-black': isBlack,
            'is-danger': isDanger,
            'is-dark': isDark,
            'is-focued': isFocused,
            'is-hovered': isHovered,
            'is-info': isInfo,
            'is-inverted': isInverted,
            'is-large': isLarge,
            'is-light': isLight,
            'is-link': isLink,
            'is-loading': isLoading,
            'is-medium': isMedium,
            'is-outlined': isOutLined,
            'is-primary': isPrimary,
            'is-small': isSmall,
            'is-static': isStatic,
            'is-success': isSuccess,
            'is-warning': isWarning,
            'is-white': isWhite,
        });

        return (
            <a className={buttonClass} {...other}>
                {icon ? icon : null}
                {this.props.children}
            </a>
        );
    }
}
export default Button;
