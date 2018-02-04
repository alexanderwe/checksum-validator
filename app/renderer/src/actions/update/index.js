import { ipcRenderer } from 'electron';
import createIpc, { send } from 'redux-electron-ipc';
import { store } from '../../entry';

export const CHECK_FOR_UPDATE = 'CHECK_FOR_UPDATE';
export const UDPATE_INFO = 'UDPATE_INFO';

//Incoming IPC messages
export const updateIpc = createIpc({
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
});

//Outgoing
export const checkForUpdate = () => {
  store.dispatch(send('checkForUpdate', {}));
};

export const updateApp = () => {
  send('update-app', {});
};
