import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Field from './Field.component.jsx';
import File from './File.component.jsx';
import Checkbox from './Checkbox.component.jsx';

class Form extends Component {
    static Field = Field;
    static File = File;
    static Checkbox = Checkbox;

    render() {
        return <div>Test</div>;
    }
}

export default Form;
