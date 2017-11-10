import * as classNames from 'classnames';
import * as React from 'react';

import Checkbox from './Checkbox.component';
import Field from './Field.component';
import File from './File.component';

class Form extends React.Component<any, any> {
  public static Field = Field;
  public static File = File;
  public static Checkbox = Checkbox;

  public render() {
    return <div></div>;
  }
}

export default Form;
