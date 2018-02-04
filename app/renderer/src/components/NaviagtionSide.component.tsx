import * as React from 'react';
import { withRouter } from 'react-router';
import { Route, NavLink, Switch } from 'react-router-dom';

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

const { Content, Sider } = Layout;

class NavigationSide extends React.Component<any, any> {
  render() {
    console.log(this.props.location.pathname);
    return (
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          maxWidth: '80px !important',
        }}
        collapsed={true}
      >
        <div className="logo" />
        <Menu
          mode="inline"
          theme="dark"
          style={{
            paddingTop: 24,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
          defaultSelectedKeys={[this.props.location.pathname]}
          selectedKeys={['/' + this.props.location.pathname.split('/')[1]]}
        >
          <Menu.Item key="/">
            <NavLink to={'/'}>
              <Icon type="search" />
            </NavLink>
            <span className="nav-text">Check</span>
          </Menu.Item>

          <Menu.Item key="/settings" style={{ marginTop: 'auto' }}>
            <NavLink to={'/settings'}>
              <Icon type="setting" />
            </NavLink>

            <span className="nav-text">Settings</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(NavigationSide);
