import * as React from 'react';
import Container from './bulma/layout/Container.component';
import Hero from './bulma/layout/hero/Hero.component';

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

import ChecksumComponent from './Checksum.component';
const { Header, Content, Footer, Sider } = Layout;

function app() {
  const collapsed = true;

  return (
    <Layout>
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
        <Menu mode="inline" theme="dark">
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">§6</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="bar-chart" />
            <span className="nav-text">nav 4</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="cloud-o" />
            <span className="nav-text">nav 5</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="appstore-o" />
            <span className="nav-text">nav 6</span>
          </Menu.Item>
          <Menu.Item key="7">
            <Icon type="team" />
            <span className="nav-text">nav 7</span>
          </Menu.Item>
          <Menu.Item key="8">
            <Icon type="shop" />
            <span className="nav-text">nav 8</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: '80px', height: '100vh' }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <ChecksumComponent />
        </Content>
      </Layout>
    </Layout>
  );
}

export default app;
