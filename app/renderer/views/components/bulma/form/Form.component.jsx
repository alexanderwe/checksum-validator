import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Field from './Field.component';
import File from './File.component';

class Form extends Component {

    static Field = Field
    static File = File

    render() {
        return (
            <div>
                Test
            </div>
        );
    }
}

export default Form;