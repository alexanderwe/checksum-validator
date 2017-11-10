import * as classNames from 'classnames';
import * as React from 'react';

interface IFileProps {
  className?: string;
  fileIcon?: object;
  fileName?: string;
  hasName?: boolean;
  isBoxed?: boolean;
  isDanger?: boolean;
  isFullWidth?: boolean;
  isInfo?: boolean;
  isLarge?: boolean;
  isMedium?: boolean;
  isPrimary?: boolean;
  isRight?: boolean;
  isSmall?: boolean;
  isSuccess?: boolean;
  isWarning?: boolean;
  label?: string;
  onChange?: (event: any) => void;
  onClick?: () => void;
}

class File extends React.Component<IFileProps, any> {
  public render() {
    const {
            hasName,
      label,
      fileIcon,
      fileName,
      isRight,
      isFullWidth,
      isBoxed,
      isPrimary,
      isSuccess,
      isInfo,
      isWarning,
      isDanger,
      isSmall,
      isMedium,
      isLarge,
      onChange,
      onClick,
      ...other,
        } = this.props;

    const fileClass = classNames('file', this.props.className, {
      'has-name': hasName,
      'is-boxed': isBoxed,
      'is-danger': isDanger,
      'is-fullwidth': isFullWidth,
      'is-info': isInfo,
      'is-large': isLarge,
      'is-medium': isMedium,
      'is-primary': isPrimary,
      'is-right': isRight,
      'is-small': isSmall,
      'is-success': isSuccess,
      'is-warning': isWarning,
    });

    return (
      <div className={fileClass}>
        <label className='file-label'>
          <input className='file-input' type='file' name='file' onChange={onChange} />
          <span className='file-cta'>
            {fileIcon ? <span className='file-icon'>{fileIcon}</span> : null}
            <span className='file-label'>{label ? label : 'Choose a file…'}</span>
          </span>
          {fileName ? <span className='file-name'>{fileName ? fileName : ''}</span> : null}
        </label>
      </div>
    );
  }
}

export default File;
