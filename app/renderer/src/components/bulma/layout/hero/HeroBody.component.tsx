import * as React from 'react';

class HeroBody extends React.Component<any, any> {
  public render() {

    const {
            ...other,
        } = this.props;

    return (
      <div className='hero-body' {...other}>
        {this.props.children}
      </div>
    );
  }
}

export default HeroBody;