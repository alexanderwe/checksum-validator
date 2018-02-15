import createIpc, { send } from 'redux-electron-ipc';
import { Events } from '../../../../lib/Events';

export const CHECK_FOR_UPDATE = 'CHECK_FOR_UPDATE';
export const UDPATE_INFO = 'UDPATE_INFO';
export const UPDATE_DOWNLOADING = 'UPDATE_DOWNLOADING';
export const UPDATE_DOWNLOADED = 'UPDATE_DOWNLOADED';

export const checkForUpdate = () => {
  return send(Events.UPDATE_CHECK);
};

export const updateApp = () => {
  return send(Events.UPDATE);
};
