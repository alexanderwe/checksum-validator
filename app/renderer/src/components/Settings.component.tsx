import * as React from 'react';
import { remote } from 'electron';
import { withRouter } from 'react-router';
import { checkForUpdate } from '../actions/update/index';
import { setSetting } from '../actions/settings/index';

import { connect } from 'react-redux';
import { Route, NavLink, Switch } from 'react-router-dom';

import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Layout from 'antd/lib/layout';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import Tooltip from 'antd/lib/tooltip';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { showLanguageOptionsChangedNotification } from '../Notifications';

import I18n from '../../../lib/i18n/I18n';

const { Header, Content, Footer, Sider } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

const i18n: I18n = new I18n();

const mapStateToProps = state => ({
  update: state.update,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => {
  return {
    checkForUpdate: () => dispatch(checkForUpdate()),
    setSetting: (key: String, value: any) => dispatch(setSetting(key, value)),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Settings extends React.Component<any, any> {
  setSaveCheck = event => {
    this.props.setSetting('saveChecks', event.target.checked);
  };

  setSaveCheckClipboard = event => {
    this.props.setSetting('saveCheckClipboard', event.target.checked);
  };

  setLanguage = value => {
    showLanguageOptionsChangedNotification();
    this.props.setSetting('language', value);
  };

  setDetectLanguage = event => {
    showLanguageOptionsChangedNotification();
    if (event.target.checked) {
      this.props.setSetting('language', remote.app.getLocale());
    }
    this.props.setSetting('detectLanguage', event.target.checked);
  };

  render() {
    return (
      <div className="settings">
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
                onChange={this.setSaveCheck}
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
                onChange={this.setSaveCheckClipboard}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div>
                <span>{i18n.translate('language') + ': '}</span>
              </div>
            </Col>
            <Col span={16}>
              <Select
                style={{ width: '30%' }}
                onChange={this.setLanguage}
                value={this.props.settings.language}
                disabled={this.props.settings.detectLanguage}
              >
                <Option value="de-AT">German (Austria)</Option>
                <Option value="de-CH">German (Switzerland)</Option>
                <Option value="de-DE">German (Germany)</Option>
                <Option value="de">German</Option>
                <Option value="en">Englisch</Option>
                <Option value="en-US">Englisch (US)</Option>
              </Select>

              <Checkbox
                style={{ marginLeft: '1rem' }}
                defaultChecked={this.props.settings.detectLanguage}
                onChange={this.setDetectLanguage}
              >
                {i18n.translate('language automatic')}
              </Checkbox>
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
