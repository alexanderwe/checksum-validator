import { SETTINGS_RELOAD } from '../actions/settings';

const initialState = {
  settings: {},
};

export function settings(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_RELOAD:
      return Object.assign({}, state, {
        settings: action.data.settings || {},
      });
    default:
      return state;
  }
}
