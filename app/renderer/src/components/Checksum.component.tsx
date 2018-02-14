import * as React from 'react'; // ES6
import { send } from 'redux-electron-ipc';

import Transition from 'react-transition-group/Transition';
import Icon from './base/Icon.component';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  checksumTypeChanged,
  validateChecksum,
} from '../actions/checksum/index';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Uploader from 'antd/lib/upload';
import Select from 'antd/lib/select';
import Layout from 'antd/lib/layout';

const Dragger = Uploader.Dragger;
const FormItem = Form.Item;
const Option = Select.Option;
const { Content, Header } = Layout;

import I18n from '../../../lib/i18n/I18n';

const i18n: I18n = new I18n();

interface IUpdateMsg {
  error: boolean;
  msg: string;
  updateAvailable: boolean;
}

const mapStateToProps = state => ({
  checksumType: state.checksum.type,
  loading: state.checksum.loading,
  update: {
    error: state.update.error,
    msg: state.update.msg,
    updateAvailable: state.update.updateAvailable,
  },
  settings: state.settings,
});

const mapDispatchToProps = dispatch => {
  return {
    validateChecksum: data => dispatch(validateChecksum(data)),
    checksumTypeChanged: value => dispatch(checksumTypeChanged(value)),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class ChecksumValidator extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.form.setFieldsValue({
      checksumType: this.props.checksumType,
    });
  }

  private normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  public handleSelectChange = (value: any) => {
    this.setState({ type: value });
  };

  public handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(this.props.settings);
        this.props.validateChecksum({
          checksum: values.checksum,
          filepath: values.files[0].originFileObj.path,
          saveCheckClipboard: this.props.settings.saveCheckClipboard,
          type: values.checksumType,
          saveChecks: this.props.settings.saveChecks,
        });
      }
    });
  };

  public render() {
    const draggerProps = {
      name: 'file',
      multiple: false,
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          console.log(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          console.log(`${info.file.name} file upload failed.`);
        }
      },
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Header style={{ background: '#fff', paddingLeft: 24 }}>
          <h2>Check</h2>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            background: '#fff',
            padding: 24,
          }}
        >
          <div className="checksum-validator">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('files', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  rules: [
                    {
                      required: true,
                      message: i18n.translate('file missing'),
                    },
                  ],
                })(
                  <Dragger {...draggerProps}>
                    <p className="ant-upload-drag-icon">
                      <Icon name="nc-archive-paper-check" />
                    </p>
                    <p className="ant-upload-text">
                      {i18n.translate('upload text')}
                    </p>
                    <p className="ant-upload-hint">
                      {i18n.translate('upload hint')}
                    </p>
                  </Dragger>,
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('checksum', {
                  rules: [
                    {
                      required: true,
                      message: i18n.translate('checksum missing'),
                    },
                  ],
                })(
                  <Input
                    style={{ marginTop: '24px' }}
                    prefix={
                      <Icon
                        name={'nc-note-code'}
                        isSmall
                        isLeft
                        style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                    }
                    placeholder="Checksum"
                  />,
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('checksumType', {
                  initialValue: this.props.checksumType,
                  rules: [
                    {
                      required: true,
                      message: 'Please specify the checksum type!',
                    },
                  ],
                })(
                  <Select onChange={this.props.checksumTypeChanged}>
                    <Option value="SHA256">SHA256</Option>
                    <Option value="SHA512">SHA512</Option>
                    <Option value="SHA1">SHA1</Option>
                    <Option value="MD5">MD5</Option>
                  </Select>,
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={this.props.loading}
                >
                  {i18n.translate('check')}
                </Button>
              </FormItem>
            </Form>
          </div>
        </Content>
      </div>
    );
  }
}

export default Form.create()(ChecksumValidator);
