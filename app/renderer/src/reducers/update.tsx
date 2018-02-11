import {
  showUpdateNotAvailableNotification,
  showUpdateAvailableNotification,
} from '../Notifications';
import {
  CHECK_FOR_UPDATE,
  UDPATE_INFO,
  UPDATE_DOWNLOADING,
} from '../actions/update/';

const initialState = {
  checkingForUpdate: false,
  error: null,
  updateAvailable: false,
  msg: null,
  downloading: false,
  updating: false,
  downloadPercentage: 0,
};

export function update(state = initialState, action) {
  switch (action.type) {
    case CHECK_FOR_UPDATE:
      return {
        ...state,
        checkingForUpdate: action.data.checkingForUpdate,
      };
    case UDPATE_INFO:
      if (action.data.updateAvailable) {
        showUpdateAvailableNotification(action.data.msg);
      } else {
        showUpdateNotAvailableNotification(action.data.msg);
      }

      return {
        ...state,
        checkingForUpdate: action.data.checkingForUpdate,
        error: action.data.error,
        updateAvailable: action.data.updateAvailable,
        msg: action.data.msg,
      };
    case UPDATE_DOWNLOADING:
      return {
        ...state,
        downloading: action.data.downloading,
        downloadPercentage: action.data.downloadPercentage,
        error: action.data.error,
        updateAvailable: action.data.updateAvailable,
        msg: action.data.msg,
      };
    case UPDATE_DOWNLOADING:
      return {
        ...state,
        downloading: action.data.downloading,
        updating: action.data.updating,
        downloadPercentage: action.data.downloadPercentage,
        error: action.data.error,
        updateAvailable: action.data.updateAvailable,
        msg: action.data.msg,
      };
    default:
      return state;
  }
}
