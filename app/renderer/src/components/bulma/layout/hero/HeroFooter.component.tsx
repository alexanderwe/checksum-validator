import * as React from 'react';

class HeroFooter extends React.Component<any, any> {
  public render() {

    const {
            ...other,
        } = this.props;

    return (
      <div className='hero-footer' {...other}>
        {this.props.children}
      </div>
    );
  }
}

export default HeroFooter;
