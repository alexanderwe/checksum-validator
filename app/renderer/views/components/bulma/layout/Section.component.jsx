import React, { Component } from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types';

class Section extends Component {

    render() {
        var sectionClass = classNames('section', this.props.className, {
            'is-medium': this.props.isMedium,
            'is-large': this.props.isLarge,

        });
        return (
            <section className={sectionClass} style={this.props.style}>
                {this.props.children}
            </section>
        );
    }
}

Section.propTypes = {
    'is-medium': PropTypes.bool,
    'is-large': PropTypes.bool,
}

export default Section;