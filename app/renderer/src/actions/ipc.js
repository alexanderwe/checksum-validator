import createIpc, { send } from 'redux-electron-ipc';
import message from 'antd/lib/message';
import { UDPATE_INFO, CHECK_FOR_UPDATE } from './update';
import { CHECKSUM_CURRENTLY_CHECKING, CHECKSUM_RESULT } from './checksum';

export const ipc = createIpc({
  update: (event, data) => {
    return {
      type: UDPATE_INFO,
      data: {
        checkingForUpdate: false,
        error: data.error,
        updateAvailable: data.updateAvailable,
        msg: data.msg,
      },
    };
  },
  checkForUpdate: (event, data) => {
    return {
      type: CHECK_FOR_UPDATE,
      data: {
        checkingForUpdate: true,
      },
    };
  },
  checksum: (event, data) => {
    console.log('currently checking');
    return {
      type: CHECKSUM_CURRENTLY_CHECKING,
      data: {
        loading: true,
      },
    };
  },
  'checksum-result': (event, data) => {
    data.match
      ? message.success('This is a message of success')
      : message.warning('This is message of warning');

    return {
      type: CHECKSUM_RESULT,
      data: {
        checksumResult: data.checksumResult,
        currentChecksum: data.currentChecksum,
        error: data.error,
        loading: false,
        match: data.match,
      },
    };
  },
});
