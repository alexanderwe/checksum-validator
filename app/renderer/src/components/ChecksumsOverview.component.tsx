import * as React from 'react';
import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import Divider from 'antd/lib/divider';
import Table from 'antd/lib/table';

const { Header, Content, Footer, Sider } = Layout;

class ChecksumsOverview extends React.Component<any, any> {
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="#">Delete</a>
            <Divider type="vertical" />
            <a href="#" className="ant-dropdown-link">
              More actions <Icon type="down" />
            </a>
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ];

    return (
      <div>
        <Header style={{ background: '#fff', paddingLeft: 24 }}>
          <h2>Past Checks</h2>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            background: '#fff',
            padding: 24,
          }}
        >
          <Table columns={columns} dataSource={data} />
        </Content>
      </div>
    );
  }
}

export default ChecksumsOverview;
