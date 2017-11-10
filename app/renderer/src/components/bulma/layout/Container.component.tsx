import * as classNames from 'classnames';
import * as React from 'react';

interface IContainerProps {
  className?: string;
  hasTextCentered?: boolean;
  isFluid?: boolean;
  isMarginless?: boolean;
  style?: object;
}

class Container extends React.Component<IContainerProps, any> {
  public render() {

    const containerClass = classNames('container', this.props.className, {
      'has-text-centered': this.props.hasTextCentered,
      'is-fluid': this.props.isFluid,
      'is-marginless': this.props.isMarginless,
    });

    return (
      <div className={containerClass} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
