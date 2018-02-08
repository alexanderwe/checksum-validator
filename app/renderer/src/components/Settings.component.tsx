import * as React from 'react';
import { withRouter } from 'react-router';
import { send } from 'redux-electron-ipc';
import { checkForUpdate, updateApp } from '../actions/update/index';
import { setSetting } from '../actions/settings/index';

import { connect } from 'react-redux';
import { Route, NavLink, Switch } from 'react-router-dom';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Layout from 'antd/lib/layout';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Tooltip from 'antd/lib/tooltip';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import I18n from '../../../lib/i18n/I18n';

const { Header, Content, Footer, Sider } = Layout;
const FormItem = Form.Item;

const i18n: I18n = new I18n();

const mapStateToProps = state => ({
  update: state.update,
  settings: state.settings.settings,
});

const mapDispatchToProps = dispatch => {
  return {
    checkForUpdate: () => dispatch(checkForUpdate()),
    setSetting: (key: String, value: any) => dispatch(setSetting(key, value)),
    updateApp: () => dispatch(updateApp()),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Settings extends React.Component<any, any> {
  saveCheck = checkedValue => {
    console.log(checkedValue);
    this.props.setSetting('saveChecks', checkedValue.target.checked);
  };

  saveCheckClipboard = checkedValue => {
    this.props.setSetting('saveCheckClipboard', checkedValue.target.checked);
  };

  render() {
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
          <Row>
            <Col span={8}>
              <div>
                <span>{i18n.translate('save checks') + ': '}</span>
                <Tooltip
                  placement="topLeft"
                  title={i18n.translate('tooltip save checks')}
                >
                  <Icon type="question-circle-o" />
                </Tooltip>
              </div>
            </Col>
            <Col span={16}>
              <Checkbox
                defaultChecked={this.props.settings.saveChecks}
                onChange={this.saveCheck}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div>
                <span>{i18n.translate('save check clipboard') + ': '}</span>
                <Tooltip
                  placement="topLeft"
                  title={i18n.translate('tooltip save check clipboard')}
                >
                  <Icon type="question-circle-o" />
                </Tooltip>
              </div>
            </Col>
            <Col span={16}>
              <Checkbox
                defaultChecked={this.props.settings.saveCheckClipboard}
                onChange={this.saveCheckClipboard}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 24 }}>
            <Button
              type="primary"
              loading={this.props.update.checkingForUpdate}
              onClick={this.props.checkForUpdate}
            >
              {i18n.translate('check for updates')}
            </Button>
          </Row>
        </Content>
      </div>
    );
  }
}

export default Settings;
