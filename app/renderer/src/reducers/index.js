import { checksum } from './checksum';
import { update } from './update';
import { routerReducer } from 'react-router-redux';

import { combineReducers } from 'redux';

const checksumApp = combineReducers({
  checksum,
  update,
  router: routerReducer,
});

export default checksumApp;
