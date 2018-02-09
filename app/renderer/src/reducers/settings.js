import { SETTINGS_RELOAD } from '../actions/settings';

const initialState = {
  saveCheckClipboard: false,
  saveChecks: false,
};

export function settings(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_RELOAD:
      return Object.assign({}, state, {
        saveCheckClipboard: action.data.settings.saveCheckClipboard || false,
        saveChecks: action.data.settings.saveChecks || false,
      });
    default:
      return state;
  }
}
