import { remote } from 'electron';
import { SETTINGS_RELOAD } from '../actions/settings';

const initialState = {
  saveCheckClipboard: false,
  saveChecks: false,
  language: 'us',
  detectLanguage: true,
  automaticUpdate: false,
};

export function settings(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_RELOAD:
      return {
        ...state,
        saveCheckClipboard: action.data.settings.saveCheckClipboard || false,
        saveChecks: action.data.settings.saveChecks || false,
        language: action.data.settings.language || remote.app.getLocale(),
        detectLanguage:
          action.data.settings.detectLanguage !== undefined
            ? action.data.settings.detectLanguage
            : true,
        automaticUpdate: action.data.settings.automaticUpdate || false,
      };
    default:
      return state;
  }
}
