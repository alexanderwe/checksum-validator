import * as React from 'react';
import { withRouter } from 'react-router';
import Layout from 'antd/lib/layout';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, NavLink, Switch } from 'react-router-dom';

import { loadSettings } from '../actions/settings';

import NavigationSide from './NaviagtionSide.component';
import ChecksumComponent from './Checksum.component';
import ChecksOverview from './ChecksOverview.component';
import Settings from './Settings.component';

const { Content } = Layout;

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    loadSettings: () => dispatch(loadSettings()),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component<any, any> {
  componentDidMount() {
    this.props.loadSettings();
  }

  render() {
    return (
      <Layout>
        <NavigationSide />
        <Layout style={{ marginLeft: '80px', height: '100vh' }}>
          <Route exact path="/" component={ChecksumComponent} />
          <Route path="/checksum-overview" component={ChecksOverview} />
          <Route path="/settings" component={Settings} />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
