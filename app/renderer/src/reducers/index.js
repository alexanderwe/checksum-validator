import { checksum } from './checksum';
import { update } from './update';
import { database } from './database';
import { routerReducer } from 'react-router-redux';

import { combineReducers } from 'redux';

const checksumApp = combineReducers({
  checksum,
  database,
  update,
  router: routerReducer,
});

export default checksumApp;
