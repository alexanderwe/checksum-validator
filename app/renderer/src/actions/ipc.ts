import createIpc, { send } from 'redux-electron-ipc';
import message from 'antd/lib/message';

import { push } from 'react-router-redux';
import store from '../store';

import {
  UDPATE_INFO,
  UPDATE_DOWNLOADING,
  CHECK_FOR_UPDATE,
  UPDATE_DOWNLOADED,
} from './update/index';
import { CHECKSUM_CURRENTLY_CHECKING, CHECKSUM_RESULT } from './checksum/index';
import {
  DATABASE_CHECKS_RELOAD,
  DATABASE_CHECK_EXPORT_SUCCESS,
} from './database/index';
import { SETTINGS_RELOAD, ROUTE_SETTINGS } from './settings/index';
import { Events } from '../../../lib/Events';

import I18n from '../../../lib/i18n/I18n';

const i18n: I18n = new I18n();

export const ipc = createIpc({
  [Events.ROUTE_SETTINGS]: (event, data) => {
    store.dispatch(push('/settings'));
    return {
      // not used in reducer
      type: ROUTE_SETTINGS,
      data: {},
    };
  },
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
  [Events.UPDATE_DOWNLOADING]: (event, data) => {
    return {
      type: UPDATE_DOWNLOADING,
      data: {
        error: data.error,
        updateAvailable: data.updateAvailable,
        msg: data.msg,
        downloading: data.downloading,
        updating: data.updating,
        downloadPercentage: data.downloadPercentage,
      },
    };
  },
  [Events.UPDATE_DOWNLOADED]: (event, data) => {
    return {
      type: UPDATE_DOWNLOADED,
      data: {
        error: data.error,
        updateAvailable: data.updateAvailable,
        msg: data.msg,
        downloading: false,
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
    return {
      type: CHECKSUM_CURRENTLY_CHECKING,
      data: {
        loading: true,
      },
    };
  },
  [Events.CHECKSUM_RESULT]: (event, data) => {
    if (data.error) {
      message.warning(i18n.translate('checksum error'));
    } else {
      data.match
        ? message.success(i18n.translate('checksum match'))
        : message.warning(i18n.translate('checksum mismatch'));
    }

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
  [Events.DATABASE_CHECK_EXPORT_SUCCESS]: (event, data) => {
    message.success(i18n.translate('file saved'));
    return {
      // not used in reducer
      type: DATABASE_CHECK_EXPORT_SUCCESS,
      data: {},
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
