import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createMemoryHistory from 'history/createMemoryHistory';

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push,
} from 'react-router-redux';

// import reducers from './reducers' // Or wherever you keep your reducers
import checksumApp from './reducers';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createMemoryHistory();
history.push('/');

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
import { ipc } from './actions/ipc';

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
import App from './components/App';

const composeEnhancers =
  (window as any).window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  checksumApp,
  composeEnhancers(applyMiddleware(ipc, ...middleware)),
);

export default store;
