import * as React from 'react';
import { withRouter } from 'react-router';
import { send } from 'redux-electron-ipc';
import { checkForUpdate, updateApp } from '../actions/update';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, NavLink, Switch } from 'react-router-dom';

import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import I18n from '../../../lib/i18n/I18n';

const { Header, Content, Footer, Sider } = Layout;

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
    return (
      <div>
        <Header style={{ background: '#fff', paddingLeft: 24 }}>
          <h2>Settings</h2>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
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

export default Settings;
