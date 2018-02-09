import * as React from 'react';
import { connect } from 'react-redux';
import { shell } from 'electron';

import { databaseReloadChecks, deleteCheck } from '../actions/database';

import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import Divider from 'antd/lib/divider';
import Table from 'antd/lib/table';
import Tooltip from 'antd/lib/tooltip';
import Popconfirm from 'antd/lib/popconfirm';
import I18n from '../../../lib/i18n/I18n';

const { Header, Content, Footer, Sider } = Layout;

const i18n: I18n = new I18n();

const mapStateToProps = state => ({
  checks: state.database.checks,
});

const mapDispatchToProps = dispatch => {
  return {
    databaseReloadChecks: () => dispatch(databaseReloadChecks()),
    deleteCheck: (id: string) => dispatch(deleteCheck(id)),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class ChecksOverview extends React.Component<any, any> {
  componentDidMount() {
    this.props.databaseReloadChecks();
  }

  deleteConfirm = id => {
    this.props.deleteCheck(id);
  };

  deleteCancel = e => {
    console.log(e);
  };

  render() {
    const columns = [
      {
        title: i18n.translate('file'),
        dataIndex: 'filePath',
        key: 'filePath',
        width: 300,
        render: text => (
          <Tooltip title={i18n.translate('open in finder')}>
            <a onClick={() => shell.showItemInFolder(text)}>
              {text.split('/').pop()}
            </a>
          </Tooltip>
        ),
      },
      {
        title: i18n.translate('check algorithm'),
        dataIndex: 'checkAlgorithm',
        key: 'checkAlgorithm',
        width: 300,
      },
      {
        title: i18n.translate('checksum match'),
        dataIndex: 'didMatch',
        key: 'didMatch',
        width: 300,
        render: match =>
          match ? (
            <Icon type="check" style={{ color: '#73d13d' }} />
          ) : (
            <Icon type="warning" style={{ color: '#ff4d4f' }} />
          ),
      },
      {
        title: i18n.translate('date'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 300,
      },
      {
        title: i18n.translate('action'),
        key: 'action',
        width: 300,
        render: record => (
          <Popconfirm
            title={i18n.translate('delete check question')}
            onConfirm={() => this.deleteConfirm(record._id)}
            onCancel={() => this.deleteCancel(record._id)}
            okText={i18n.translate('yes')}
            cancelText={i18n.translate('no')}
          >
            <a href="#">{i18n.translate('delete')}</a>
          </Popconfirm>
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
          <Table
            columns={columns}
            dataSource={this.props.checks}
            rowKey="_id"
          />
        </Content>
      </div>
    );
  }
}

export default ChecksOverview;
