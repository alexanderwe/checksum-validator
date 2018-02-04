import * as React from 'react';
import { withRouter } from 'react-router';
import Layout from 'antd/lib/layout';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, NavLink, Switch } from 'react-router-dom';

import NavigationSide from './NaviagtionSide.component';
import ChecksumComponent from './Checksum.component';
import ChecksumsOverview from './ChecksumsOverview.component';
import Settings from './Settings.component';

const { Content } = Layout;

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component {
  render() {
    const collapsed = true;
    return (
      <Layout>
        <NavigationSide />
        <Layout style={{ marginLeft: '80px', height: '100vh' }}>
          <Route exact path="/" component={ChecksumComponent} />
          <Route path="/checksum-overview" component={ChecksumsOverview} />
          <Route path="/settings" component={Settings} />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
