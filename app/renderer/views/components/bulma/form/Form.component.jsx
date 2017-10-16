import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Field from './Field.component';
import File from './File.component';
import Checkbox from './Checkbox.component';

class Form extends Component {

    static Field = Field
    static File = File
    static Checkbox = Checkbox

    render() {
        return (
            <div>
                Test
            </div>
        );
    }
}

export default Form;