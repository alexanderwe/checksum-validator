import * as React from 'react';
import Layout from 'antd/lib/layout';

const { Header, Content, Footer, Sider } = Layout;

class ChecksumsOverview extends React.Component<any, any> {
  render() {
    const Fragment = (React as any).Fragment;
    return (
      <div>
        <Header style={{ background: '#fff', paddingLeft: 24 }}>
          <h2>Past Checks</h2>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          Hey Ho
        </Content>
      </div>
    );
  }
}

export default ChecksumsOverview;
