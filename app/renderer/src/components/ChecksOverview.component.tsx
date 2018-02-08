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
        width: 300,
        render: text => <a href="#">{text}</a>,
      },
      {
        title: 'Check Algorithm',
        dataIndex: 'checkAlgorithm',
        key: 'checkAlgorithm',
        width: 300,
      },
      {
        title: 'Match ?',
        dataIndex: 'didMatch',
        key: 'didMatch',
        width: 300,
        render: text => <span>{text.toString()}</span>,
      },
      {
        title: 'Action',
        key: 'action',
        width: 300,
        render: () => <a href="#">action</a>,
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
