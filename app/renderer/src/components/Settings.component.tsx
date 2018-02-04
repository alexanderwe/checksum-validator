import * as React from 'react';
import { withRouter } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, NavLink, Switch } from 'react-router-dom';

import { checkForUpdate, updateApp } from '../actions/update';

import Button from 'antd/lib/button';

import I18n from '../../../lib/i18n/I18n';
const i18n: I18n = new I18n();

const mapStateToProps = state => ({
  update: state.update,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ checkForUpdate, updateApp }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
class Settings extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Button
          type="primary"
          loading={this.props.update.checkingForUpdate}
          onClick={this.props.checkForUpdate}
        >
          {i18n.translate('check for updates')}
        </Button>
      </div>
    );
  }
}

export default Settings;
