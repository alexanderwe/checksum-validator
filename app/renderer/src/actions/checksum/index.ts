import { send } from 'redux-electron-ipc';
import message from 'antd/lib/message';
import { Events } from '../../../../main/src/Events';

export const CHECKSUM_TYPE_CHANGED = 'CHECKSUM_TYPE_CHANGED';
export const CHECKSUM_CURRENTLY_CHECKING = 'CHECKSUM_CURRENTLY_CHECKING';
export const CHECKSUM_RESULT = 'CHECKSUM_RESULT';

export const checksumTypeChanged = checksumType => {
  return {
    type: CHECKSUM_TYPE_CHANGED,
    data: {
      checksumType: checksumType,
    },
  };
};

export const checksumIsChecking = () => {
  return {
    type: CHECKSUM_CURRENTLY_CHECKING,
    data: {
      loading: true,
    },
  };
};

export const validateChecksum = data => {
  checksumIsChecking();
  return send(Events.CHECKSUM, data);
};
