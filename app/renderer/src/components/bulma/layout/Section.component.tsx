import * as classNames from 'classnames';
import * as React from 'react';

interface ISectionProps {
  className?: string;
  isLarge?: boolean;
  isMedium?: boolean;
  style?: object;
}

class Section extends React.Component<ISectionProps, any> {

  public render() {
    const sectionClass = classNames('section', this.props.className, {
      'is-large': this.props.isLarge,
      'is-medium': this.props.isMedium,

    });
    return (
      <section className={sectionClass} style={this.props.style}>
        {this.props.children}
      </section>
    );
  }
}

export default Section;
