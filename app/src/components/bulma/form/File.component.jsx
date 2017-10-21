import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
class File extends Component {



    render() {

        const { hasName,
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
            ...other } = this.props;

        const fileClass = classNames('file', this.props.className, {
            'has-name': hasName,
            'is-right': isRight,
            'is-fullwidth': isFullWidth,
            'is-boxed': isBoxed,
            'is-primary': isPrimary,
            'is-success': isSuccess,
            'is-info': isInfo,
            'is-warning': isWarning,
            'is-danger': isDanger,
            'is-small': isSmall,
            'is-medium': isMedium,
            'is-large': isLarge
        });

        return (
            <div className={fileClass}>
                <label className="file-label">
                    <input className="file-input" type="file" name="file" onChange={onChange} />
                    <span className="file-cta">
                        {fileIcon ? <span className="file-icon">
                            {fileIcon}
                        </span> : null}
                        <span className="file-label">
                            {label ? label : 'Choose a file…'}
                        </span>
                    </span>
                    {fileName ? <span className="file-name">
                        {fileName ? fileName : ''}
                    </span> : null}
                </label>
            </div>
        );
    }
}

File.PropTypes = {
    label: PropTypes.string,
    fileIcon: PropTypes.object,
    isRight: PropTypes.bool,
    isFullWidth: PropTypes.bool,
    isBoxed: PropTypes.bool,
    isPrimary: PropTypes.bool,
    isSuccess: PropTypes.bool,
    isInfo: PropTypes.bool,
    isWarning: PropTypes.bool,
    isDanger: PropTypes.bool,
    isSmall: PropTypes.bool,
    isMedium: PropTypes.bool,
    isLarge: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func
}


export default File;