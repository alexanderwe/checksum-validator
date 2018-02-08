import createIpc, { send } from 'redux-electron-ipc';

export const DATABSE_CHECKS_RELOAD = 'DATABSE_CHECKS_RELOAD';

export const databaseReloadChecks = () => {
  return send('database:checks-reload');
};
