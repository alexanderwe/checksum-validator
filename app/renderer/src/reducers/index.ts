import { checksum } from './checksum';
import { update } from './update';
import { database } from './database';
import { settings } from './settings';
import { routerReducer } from 'react-router-redux';

import { combineReducers } from 'redux';

const checksumApp = combineReducers({
  checksum,
  database,
  update,
  settings,
  router: routerReducer,
});

export default checksumApp;
