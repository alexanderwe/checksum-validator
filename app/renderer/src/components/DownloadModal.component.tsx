import * as React from 'react';
import { connect } from 'react-redux';

import { Button, Modal, Progress } from 'antd';

import { updateApp } from '../actions/update';

import I18n from '../../../lib/i18n/I18n';
const i18n: I18n = new I18n();

const mapStateToProps = state => ({
  update: state.update,
});

const mapDispatchToProps = dispatch => {
  return {
    updateApp: () => dispatch(updateApp()),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class DownloadModal extends React.Component<any, any> {
  handleExit = () => {
    this.props.updateApp();
  };

  render() {
    return (
      <Modal
        title={'Update'}
        visible={this.props.update.updating}
        wrapClassName="vertical-center-modal update-modal"
        closable={false}
        footer={[
          <Button
            disabled={
              this.props.update.downloading ||
              this.props.update.downloadPercentage !== 100
            }
            key="enter"
            onClick={this.handleExit}
            type="primary"
          >
            {i18n.translate('restart application')}
          </Button>,
        ]}
      >
        <Progress
          type="circle"
          percent={this.props.update.downloadPercentage}
        />
      </Modal>
    );
  }
}

export default DownloadModal;