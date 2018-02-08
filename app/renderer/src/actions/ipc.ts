import createIpc, { send } from 'redux-electron-ipc';
import message from 'antd/lib/message';

import { UDPATE_INFO, CHECK_FOR_UPDATE } from './update/index';
import { CHECKSUM_CURRENTLY_CHECKING, CHECKSUM_RESULT } from './checksum/index';
import { DATABASE_CHECKS_RELOAD } from './database/index';
import { SETTINGS_RELOAD } from './settings/index';
import { Events } from '../../../main/src/Events';

import I18n from '../../../lib/i18n/I18n';

const i18n: I18n = new I18n();

export const ipc = createIpc({
  [Events.UPDATE]: (event, data) => {
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
  [Events.UPDATE_CHECK]: (event, data) => {
    return {
      type: CHECK_FOR_UPDATE,
      data: {
        checkingForUpdate: true,
      },
    };
  },
  [Events.CHECKSUM]: (event, data) => {
    console.log('currently checking');
    return {
      type: CHECKSUM_CURRENTLY_CHECKING,
      data: {
        loading: true,
      },
    };
  },
  [Events.CHECKSUM_RESULT]: (event, data) => {
    data.match
      ? message.success(i18n.translate('checksum match'))
      : message.warning(i18n.translate('checksum mismatch'));

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
  [Events.DATABASE_CHECKS_RELOAD]: (event, data) => {
    return {
      type: DATABASE_CHECKS_RELOAD,
      data: {
        checks: data,
      },
    };
  },
  [Events.SETTINGS_LOAD]: (event, data) => {
    return {
      type: SETTINGS_RELOAD,
      data: {
        settings: data,
      },
    };
  },
});
