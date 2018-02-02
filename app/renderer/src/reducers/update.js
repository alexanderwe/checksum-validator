import { CHECK_FOR_UPDATE, UDPATE_INFO } from '../actions/update/';

const initialState = {
  checkingForUpdate: false,
  error: null,
  updateAvailable: false,
  msg: null,
};

export function update(state = initialState, action) {
  switch (action.type) {
    case CHECK_FOR_UPDATE:
      return Object.assign({}, state, {
        checkingForUpdate: action.data.checkingForUpdate,
      });
    case UDPATE_INFO:
      return Object.assign({}, state, {
        checkingForUpdate: action.data.checkingForUpdate,
        error: action.data.error,
        updateAvailable: action.data.updateAvailable,
        msg: action.data.msg,
      });
    default:
      return state;
  }
}
