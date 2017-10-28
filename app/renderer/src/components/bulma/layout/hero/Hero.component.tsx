import * as classNames from 'classnames';
import * as React from 'react';

import HeroBody from './HeroBody.component';
import HeroFooter from './HeroFooter.component';
import HeroHeader from './HeroHeader.component';

interface IHeroProps {
    className?: string;
    hasTextCentered?: boolean;
    isFullHeight?: boolean;
    isLarge?: boolean;
    isMedium?: boolean;
}

class Hero extends React.Component<IHeroProps, any> {
   public static Header = HeroHeader;
   public static Body = HeroBody;
   public static Footer = HeroFooter;

    public render() {
        const { isMedium, isLarge, isFullHeight, hasTextCentered, ...other } = this.props;

        const heroClass = classNames('hero', this.props.className, {
            'has-text-centered': hasTextCentered,
            'is-fullheight': isFullHeight,
            'is-large': isLarge,
            'is-medium': isMedium,
        });

        return (
            <section className={heroClass} {...other}>
                {this.props.children}
            </section>
        );
    }
}

export default Hero;
