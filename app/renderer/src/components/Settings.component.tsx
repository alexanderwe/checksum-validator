import * as React from 'react';
import { withRouter } from 'react-router';
import { send } from 'redux-electron-ipc';
import { checkForUpdate, updateApp } from '../actions/update/index';

import { connect } from 'react-redux';
import { Route, NavLink, Switch } from 'react-router-dom';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Layout from 'antd/lib/layout';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Tooltip from 'antd/lib/tooltip';
import Checkbox from 'antd/lib/checkbox';

import I18n from '../../../lib/i18n/I18n';

const { Header, Content, Footer, Sider } = Layout;
const FormItem = Form.Item;

const i18n: I18n = new I18n();

const mapStateToProps = state => ({
  update: state.update,
});

const mapDispatchToProps = dispatch => {
  return {
    checkForUpdate: () => dispatch(checkForUpdate()),
    updateApp: () => dispatch(updateApp()),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Settings extends React.Component<any, any> {
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <div>
        <Header style={{ background: '#fff', paddingLeft: 24 }}>
          <h2>{i18n.translate('settings')}</h2>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            background: '#fff',
            padding: 24,
          }}
        >
          <Form layout="vertical">
            <FormItem
              label={
                <div>
                  <span>{i18n.translate('save checks') + ': '}</span>
                  <Tooltip
                    placement="topLeft"
                    title={i18n.translate('tooltip save checks')}
                  >
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </div>
              }
              {...formItemLayout}
            >
              {getFieldDecorator('saveChecks', {
                valuePropName: 'saveChecks',
                initialValue: true,
              })(<Checkbox />)}
            </FormItem>
          </Form>
          <Button
            type="primary"
            loading={this.props.update.checkingForUpdate}
            onClick={this.props.checkForUpdate}
          >
            {i18n.translate('check for updates')}
          </Button>
        </Content>
      </div>
    );
  }
}

export default Form.create()(Settings);
