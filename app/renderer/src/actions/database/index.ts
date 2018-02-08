import createIpc, { send } from 'redux-electron-ipc';

export const DATABASE_CHECKS_RELOAD = 'DATABASE_CHECKS_RELOAD';

export const databaseReloadChecks = () => {
  return send('database:checks-reload');
};
