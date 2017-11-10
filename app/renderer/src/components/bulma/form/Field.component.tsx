import * as classNames from 'classnames';
import * as React from 'react';

interface IFieldProps {
  className?: string;
  hasAddons?: boolean;
  hasIconsLeft?: boolean;
  hasIconsRight?: boolean;
}

class Field extends React.Component<IFieldProps, any> {

  public render() {

    const { hasAddons,
      hasIconsLeft,
      hasIconsRight,
      ...other } = this.props;

    const fieldClass = classNames('field', this.props.className, {
      'has-addons': hasAddons,
    });

    const controlClass = classNames('control', {
      'has-icons-left': hasIconsLeft,
      'has-icons-right': hasIconsRight,
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

export default Field;
