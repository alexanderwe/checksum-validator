import { ipcRenderer } from 'electron';
import * as React from 'react'; // ES6
import Transition from 'react-transition-group/Transition';

import FadeAndSlideDownTransition from './transition/FadeAndSlideDownTransition.component';
import Notification from './bulma/element/Notification.component';
import BulmaIcon from './bulma/element/Icon.component';

/*
import BulmaButton from './bulma/element/Button.component';


import Form from './bulma/form/Form.component';
import Container from './bulma/layout/Container.component';
import Hero from './bulma/layout/hero/Hero.component';
import Section from './bulma/layout/Section.component';

import Tag from './bulma/element/Tag.component';
import Button from 'antd/lib/button';
*/
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

import I18n from '../../../lib/i18n/I18n';

const i18n: I18n = new I18n();

interface IUpdateMsg {
  error: boolean;
  msg: string;
  updateAvailable: boolean;
}

interface IChecksumValidatorState {
  checksum: string;
  checksumResult: string;
  error: boolean;
  fileHover: boolean;
  fileName: string;
  filePath: string;
  loading: boolean;
  match: boolean;
  notificationOpen: boolean;
  saveChecksum: boolean;
  type: string;
  updateMsg: IUpdateMsg;
  checkingForUpdate: boolean;
}

class ChecksumValidator extends React.Component<any, IChecksumValidatorState> {
  constructor(props: any) {
    super(props);
    this.state = {
      checkingForUpdate: false,
      checksum: '',
      checksumResult: '',
      error: false,
      fileHover: false,
      fileName: '',
      filePath: '',
      loading: false,
      match: false,
      notificationOpen: false,
      saveChecksum: false,
      type: 'SHA256',
      updateMsg: null
    };
  }

  public componentDidMount() {
    ipcRenderer
      .on('checksum-result', (event: any, data: any) => {
        this.setState(
          {
            checksumResult: data.checksumResult,
            error: data.error,
            loading: false,
            match: data.match
          },
          this.openNotification()
        );
      })
      .on('check', (event: any, data: any) => {
        this.check();
      })
      .on('update', (event: any, data: any) => {
        this.setState({
          checkingForUpdate: false,
          updateMsg: data
        });
      })
      .on('checkForUpdate', (event: any, data: any) => {
        this.setState({
          checkingForUpdate: true
        });
      });

    document.body.ondrop = (event: any) => {
      this.setState({
        fileHover: false,
        fileName: event.dataTransfer.files[0].name,
        filePath: event.dataTransfer.files[0].path
      });
      event.preventDefault();
    };

    document.ondragover = document.ondrop = (event: any) => {
      event.preventDefault();
      this.setState({
        fileHover: true
      });
    };
    document.ondragend = document.ondrop = (event: any) => {
      event.preventDefault();
      this.setState({
        fileHover: false
      });
    };

    document.ondragleave = (event: any) => {
      event.preventDefault();
      if (event.target.className === 'hero-body') {
        this.setState({
          fileHover: false
        });
      }
    };
  }

  public handleSelectChange = (event: any) => {
    this.setState({ type: event.target.value });
  };

  public handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  public handleFileChange = (event: any) => {
    this.setState({
      fileName: event.target.files[0].name,
      filePath: event.target.files[0].path
    });
  };

  public handleCheckboxChange = (event: any) => {
    this.setState({
      saveChecksum: event.target.checked
    });
  };

  public closeNotification = (): any => {
    this.setState({
      notificationOpen: false
    });
  };

  public openNotification = (): any => {
    this.setState({
      notificationOpen: true
    });
  };

  public updateApp = (): any => {
    ipcRenderer.send('update-app', {});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  public check = () => {
    if (this.state.filePath !== '' && this.state.checksum !== '') {
      this.closeNotification();
      this.setState({
        loading: true
      });
      setTimeout(() => {
        ipcRenderer.send('checksum', {
          checksum: this.state.checksum,
          filepath: this.state.filePath,
          saveChecksum: this.state.saveChecksum,
          type: this.state.type
        });
      }, 1000);
    }
  };

  public render() {
    const button = <div>Button</div>;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="checksum-validator">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ChecksumValidator);
