import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
    render() {

        const { label,
            disabled,
            onChange,
            onClick,
            ...other } = this.props;

        return (
            <label className="checkbox" disabled={disabled} {...other} >
                <input type="checkbox" onChange={onChange} onClick={onClick} />
                {label}
            </label>
        );
    }
}

Checkbox.PropTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func
}



export default Checkbox;