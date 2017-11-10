import * as React from 'react';
import Transition from 'react-transition-group/Transition';

interface IFadeAndSlideDownTransitionProps {
  duration?: number;
  in?: boolean;
}

export default class FadeAndSlideDownTransition extends React.Component<IFadeAndSlideDownTransitionProps, any> {
  public render() {

    const defaultStyle = {
      position: 'absolute',
      transform: 'translateY(-20%)',
      transition: `${this.props.duration}ms ease-in`,
      transitionProperty: 'opacity, transform',
      width: '100%',
      zIndex: 1,
    };

    const transitionStyles = {
      entered: { opacity: 1, transform: 'translateY(0)' },
      entering: { opacity: 0, transform: 'translateY(-20%)' },
      exited: { opacity: 0, zIndex: -1 },
      exiting: { opacity: 0, transform: 'translateY(-20%)' },
    };

    return (
      <Transition in={this.props.in} timeout={{ enter: 10, exit: this.props.duration }}>
        {
          (status) => {
            const currentStyles = transitionStyles[status];
            return React.cloneElement(this.props.children as JSX.Element, {
              style: Object.assign({}, defaultStyle, currentStyles),
            });
          }
        }
      </Transition>
    );
  }
}
