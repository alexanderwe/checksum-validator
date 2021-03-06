import { send } from 'redux-electron-ipc';
import { Events } from '../../../../lib/Events';

export const SETTINGS_RELOAD = 'SETTINGS_RELOAD';
export const ROUTE_SETTINGS = 'ROUTE_SETTINGS';

export const loadSettings = () => {
  return send(Events.SETTINGS_LOAD);
};

export const setSetting = (key: String, value: any) => {
  return send(Events.SETTINGS_UPDATED, { key, value });
};
