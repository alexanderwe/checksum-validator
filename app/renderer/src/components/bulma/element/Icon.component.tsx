import * as classNames from 'classnames';
import * as React from 'react';

interface IIconProps {
    className?: string;
    isLarge?: boolean;
    isLeft?: boolean;
    isMedium?: boolean;
    isRight?: boolean;
    isSmall?: boolean;
    name?: string;
    spin?: boolean;
    style?: object;
}

class Icon extends React.Component<IIconProps, {}> {
    public render() {
        const { isSmall, isMedium, isLarge, isLeft, isRight, name, spin, ...other } = this.props;

        const iconClass = classNames('icon', this.props.className, {
            'is-large': isLarge,
            'is-left': isLeft,
            'is-medium': isMedium,
            'is-right': isRight,
            'is-small': isSmall,
        });

        const ncIconSizeClass = classNames({
            'lg': isMedium,
            'x2': isLarge,
        });

        const spinClass = spin ? 'spin' : null;

        return (
            <span className={iconClass} {...other}>
                <i className={'nc-icon ' + name + ' ' + spinClass + ' ' + ncIconSizeClass} />
            </span>
        );
    }
}

export default Icon;
