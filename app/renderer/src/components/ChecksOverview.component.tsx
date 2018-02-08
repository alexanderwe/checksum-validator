import * as React from 'react';
import { connect } from 'react-redux';

import { databaseReloadChecks } from '../actions/database';

import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import Divider from 'antd/lib/divider';
import Table from 'antd/lib/table';
import I18n from '../../../lib/i18n/I18n';

const { Header, Content, Footer, Sider } = Layout;

const i18n: I18n = new I18n();

const mapStateToProps = state => ({
  checks: state.database.checks,
});

const mapDispatchToProps = dispatch => {
  return {
    databaseReloadChecks: () => dispatch(databaseReloadChecks()),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class ChecksOverview extends React.Component<any, any> {
  componentDidMount() {
    this.props.databaseReloadChecks();
  }

  render() {
    const columns = [
      {
        title: 'File',
        dataIndex: 'filePath',
        key: 'filePath',
        render: text => <a href="#">{text}</a>,
      },
      {
        title: 'Check Algorithm',
        dataIndex: 'checkAlgorithm',
        key: 'checkAlgorithm',
      },
      {
        title: 'Match ?',
        dataIndex: 'didMatch',
        key: 'didMatch',
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

    return (
      <div>
        <Header style={{ background: '#fff', paddingLeft: 24 }}>
          <h2>{i18n.translate('past checks')}</h2>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            background: '#fff',
            padding: 24,
          }}
        >
          <Table columns={columns} dataSource={this.props.checks} />
        </Content>
      </div>
    );
  }
}

export default ChecksOverview;
