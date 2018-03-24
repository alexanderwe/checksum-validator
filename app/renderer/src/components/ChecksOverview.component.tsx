import * as React from 'react';
import { connect } from 'react-redux';
import { shell } from 'electron';

import {
  databaseReloadChecks,
  deleteCheck,
  exportCheck,
} from '../actions/database';

import {
  message,
  Layout,
  Row,
  Col,
  Icon,
  Divider,
  Table,
  Tooltip,
  Popconfirm,
  Modal,
} from 'antd';
import I18n from '../../../lib/i18n/I18n';

const { Header, Content, Footer, Sider } = Layout;

const i18n: I18n = new I18n();

const mapStateToProps = state => ({
  checks: state.database.checks,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => {
  return {
    databaseReloadChecks: () => dispatch(databaseReloadChecks()),
    deleteCheck: (id: string) => dispatch(deleteCheck(id)),
    exportCheck: (id: string) => dispatch(exportCheck(id)),
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
    //doNothing
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
            <a
              onClick={() => {
                const success = shell.showItemInFolder(text);
                if (!success) {
                  message.warning(i18n.translate('file original missing'));
                }
              }}
            >
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
        filters: [
          {
            text: i18n.translate('checksum match'),
            value: 'true',
          },
          {
            text: i18n.translate('checksum mismatch'),
            value: 'false',
          },
        ],
        onFilter: (value, record) => {
          return (
            record.didMatch === (value.toLowerCase() === 'true' ? true : false) // Note: value is passed as a string so it is needed to convert it to boolean
          );
        },
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
        sorter: (a, b) => {
          return (
            (new Date(a.createdAt) as any) - (new Date(b.createdAt) as any)
          );
        },
        defaultSortOrder: 'descend' as 'descend',
        render: text => {
          return (
            <span>
              {new Date(text).toLocaleString(this.props.settings.language, {
                hour12: false,
              })}
            </span>
          );
        },
      },
      {
        title: i18n.translate('action'),
        key: 'action',
        width: 300,
        render: record => (
          <span>
            <a onClick={() => this.props.exportCheck(record._id)}>Export</a>
            <Divider type="vertical" />
            <Popconfirm
              title={i18n.translate('delete check question')}
              onConfirm={() => this.deleteConfirm(record._id)}
              onCancel={() => this.deleteCancel(record._id)}
              okText={i18n.translate('yes')}
              cancelText={i18n.translate('no')}
            >
              <a href="#">{i18n.translate('delete')}</a>
            </Popconfirm>
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
          <Table
            columns={columns}
            dataSource={this.props.checks}
            rowKey="_id"
            expandedRowRender={record => (
              <div style={{ margin: 0 }}>
                <Row>
                  <Col span={8}>
                    <div>
                      <span>
                        {' '}
                        <strong>
                          {i18n.translate('used to check') + ': '}{' '}
                        </strong>
                      </span>
                    </div>
                  </Col>
                  <Col span={16}>
                    <span>
                      <strong>{record.checkString}</strong>
                    </span>
                  </Col>
                </Row>

                {record.checksums.map(checksum => {
                  return (
                    <Row key={checksum.algorithm}>
                      <Col span={8}>
                        <div>
                          {checksum.algorithm === record.checkAlgorithm ? (
                            <span>
                              <strong>{`${checksum.algorithm} :`}</strong>
                            </span>
                          ) : (
                            <span>{`${checksum.algorithm} :`}</span>
                          )}
                        </div>
                      </Col>
                      <Col span={16}>
                        {checksum.algorithm === record.checkAlgorithm ? (
                          <span>
                            <strong>{checksum.checksum}</strong>
                          </span>
                        ) : (
                          <span>{checksum.checksum}</span>
                        )}
                      </Col>
                    </Row>
                  );
                })}
              </div>
            )}
          />
        </Content>
      </div>
    );
  }
}

export default ChecksOverview;
