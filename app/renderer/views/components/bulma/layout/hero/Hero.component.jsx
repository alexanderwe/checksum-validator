import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import HeroHeader from "./HeroHeader.component.jsx";
import HeroBody from "./HeroBody.component.jsx";
import HeroFooter from "./HeroFooter.component.jsx";

class Hero extends Component {


    static Header = HeroHeader
    static Body = HeroBody
    static Footer = HeroFooter

    render() {

        var { isMedium,
            isLarge,
            isFullHeight,
            hasTextCentered,
            ...other } = this.props;

        var heroClass = classNames('hero', this.props.className, {
            'is-medium': isMedium,
            'is-large': isLarge,
            'is-fullheight': isFullHeight,
            'has-text-centered': hasTextCentered
        });

        return (
            <section className={heroClass} {...other}>
                {this.props.children}
            </section>
        );
    }
}

Hero.propTypes = {
    'is-medium': PropTypes.bool,
    'is-large': PropTypes.bool,
    'is-fullheight': PropTypes.bool,
    'has-text-centered': PropTypes.bool,
}

export default Hero;