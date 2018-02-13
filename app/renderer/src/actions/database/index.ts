import createIpc, { send } from 'redux-electron-ipc';
import { Events } from '../../../../lib/Events';

export const DATABASE_CHECKS_RELOAD = 'DATABASE_CHECKS_RELOAD';
export const DATABASE_CHECK_EXPORT_SUCCESS = 'DATABASE_CHECK_EXPORT_SUCCESS';

export const databaseReloadChecks = () => {
  return send(Events.DATABASE_CHECKS_RELOAD);
};

export const deleteCheck = (id: string) => {
  return send(Events.DATABASE_CHECK_DELETE, { _id: id });
};

export const exportCheck = (id: string) => {
  return send(Events.DATABASE_CHECK_EXPORT, { _id: id });
};
