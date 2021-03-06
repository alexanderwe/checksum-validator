import createIpc, { send } from 'redux-electron-ipc';
import { message } from 'antd';

import { push } from 'react-router-redux';
import store from '../store';

import electronLog from 'electron-log';

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

import I18n from '../../../lib/i18n/i18n';

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
    electronLog.debug('(Renderer) - Message from main: EVENTS.UPDATE');
    electronLog.debug(`(Renderer) - ${JSON.stringify(data)}`);
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
    electronLog.debug('(Renderer) - Message from main: Events.UPDATE_DOWNLOADING');
    electronLog.debug(`(Renderer) - ${JSON.stringify(data)}`);
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
    electronLog.debug('(Renderer) - Message from main: Events.UPDATE_DOWNLOADED');
    electronLog.debug(`(Renderer) - ${JSON.stringify(data)}`);
    return {
      type: UPDATE_DOWNLOADED,
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
  [Events.UPDATE_CHECK]: (event, data) => {
    electronLog.debug('(Renderer) - Message from main: Events.UPDATE_CHECK');
    electronLog.debug(`(Renderer) - ${JSON.stringify(data)}`);
    return {
      type: CHECK_FOR_UPDATE,
      data: {
        checkingForUpdate: true,
      },
    };
  },
  [Events.CHECKSUM]: (event, data) => {
    electronLog.debug('(Renderer) - Message from main: Events.CHECKSUM');
    electronLog.debug(`(Renderer) - ${JSON.stringify(data)}`);
    return {
      type: CHECKSUM_CURRENTLY_CHECKING,
      data: {
        loading: true,
      },
    };
  },
  [Events.CHECKSUM_RESULT]: (event, data) => {
    electronLog.debug('(Renderer) - Message from main: Events.CHECKSUM_RESULT');
    electronLog.debug(`(Renderer) - ${JSON.stringify(data)}`);
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
    electronLog.debug('(Renderer) - Message from main: Events.DATABASE_CHECKS_RELOAD');
    return {
      type: DATABASE_CHECKS_RELOAD,
      data: {
        checks: data,
      },
    };
  },
  [Events.DATABASE_CHECK_EXPORT_SUCCESS]: (event, data) => {
    electronLog.debug('(Renderer) - Message from main: Events.DATABASE_CHECK_EXPORT_SUCCESS');
    electronLog.debug(`(Renderer) - ${JSON.stringify(data)}`);
    message.success(i18n.translate('file saved'));
    return {
      // not used in reducer
      type: DATABASE_CHECK_EXPORT_SUCCESS,
      data: {},
    };
  },
  [Events.SETTINGS_LOAD]: (event, data) => {
    electronLog.debug('(Renderer) - Message from main: Events.SETTINGS_LOAD');
    electronLog.debug(`(Renderer) - ${JSON.stringify(data)}`);
    return {
      type: SETTINGS_RELOAD,
      data: {
        settings: data,
      },
    };
  },
});
