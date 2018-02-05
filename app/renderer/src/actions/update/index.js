import createIpc, { send } from 'redux-electron-ipc';

export const CHECK_FOR_UPDATE = 'CHECK_FOR_UPDATE';
export const UDPATE_INFO = 'UDPATE_INFO';

export const checkForUpdate = () => {
  return send('checkForUpdate');
};

export const updateApp = () => {
  return send('update-app');
};
