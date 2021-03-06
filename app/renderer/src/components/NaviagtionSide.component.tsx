import * as React from 'react';
import { withRouter } from 'react-router';
import { Route, NavLink, Switch } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';
import BulmaIcon from './base/Icon.component';
import I18n from '../../../lib/i18n/i18n';

const { Content, Sider } = Layout;
const i18n: I18n = new I18n();

class NavigationSide extends React.Component<any, any> {
  render() {
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
              <BulmaIcon name="nc-zoom-2" />
            </NavLink>
            <span className="nav-text">Check</span>
          </Menu.Item>
          <Menu.Item key="/checksum-overview">
            <NavLink to={'/checksum-overview'}>
              <BulmaIcon name="nc-segmentation" />
            </NavLink>
            <span className="nav-text">Checksums</span>
          </Menu.Item>

          <Menu.Item key="/settings" style={{ marginTop: 'auto' }}>
            <NavLink to={'/settings'}>
              <BulmaIcon name="nc-settings-gear-64" />
            </NavLink>

            <span className="nav-text">{i18n.translate('settings')}</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(NavigationSide);
