import * as classNames from 'classnames';
import * as React from 'react';

interface ITagProps {
  className?: string;
  isBlack?: boolean;
  isDanger?: boolean;
  isDark?: boolean;
  isInfo?: boolean;
  isLarge?: boolean;
  isLight?: boolean;
  isLink?: boolean;
  isMedium?: boolean;
  isPrimary?: boolean;
  isSuccess?: boolean;
  isWarning?: boolean;
  isWhite?: boolean;
  style?: object;
  onClick?: () => void;
}

class Tag extends React.Component<ITagProps, {}> {
  public render() {
    const {
            isBlack,
      isDanger,
      isDark,
      isInfo,
      isLarge,
      isLight,
      isLink,
      isMedium,
      isPrimary,
      isSuccess,
      isWarning,
      isWhite,
      style, ...other } = this.props;

    const tagClass = classNames('tag', this.props.className, {
      'is-black': isBlack,
      'is-danger': isDanger,
      'is-dark': isDark,
      'is-info': isInfo,
      'is-large': isLarge,
      'is-light': isLight,
      'is-link': isLink,
      'is-medium': isMedium,
      'is-primary': isPrimary,
      'is-success': isSuccess,
      'is-warning': isWarning,
      'is-white': isWhite,
    });

    return (
      <span className={tagClass} {...other} style={this.props.style}>
        {this.props.children}
      </span>
    );
  }
}

export default Tag;
