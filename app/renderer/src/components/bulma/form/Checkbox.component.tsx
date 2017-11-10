import * as React from 'react';

interface ICheckboxState {
  label?: string;
  disabled?: boolean;
  onChange?: () => void;
  onClick?: () => void;
}

class Checkbox extends React.Component<ICheckboxState, any> {
  public render() {

    const { label,
      disabled,
      onChange,
      onClick,
      ...other } = this.props;

    return (
      <label className='checkbox' {...other} >
        <input type='checkbox' onChange={onChange} onClick={onClick} />
        {label}
      </label>
    );
  }
}

export default Checkbox;
