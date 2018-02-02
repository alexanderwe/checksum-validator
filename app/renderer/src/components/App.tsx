import * as React from 'react';
import { withRouter } from 'react-router';
import Layout from 'antd/lib/layout';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, NavLink, Switch } from 'react-router-dom';

import NavigationSide from './NaviagtionSide.component';
import ChecksumComponent from './Checksum.component';

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
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Route exact path="/" component={ChecksumComponent} />
            <Route path="/settings" component={null} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
