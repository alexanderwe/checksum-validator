import * as React from 'react';

class HeroHeader extends React.Component<any, any> {
  public render() {

    const {
            ...other,
        } = this.props;

    return (
      <div className='hero-header' {...other}>
        {this.props.children}
      </div>
    );
  }
}

export default HeroHeader;
