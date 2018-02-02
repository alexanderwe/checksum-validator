import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import createMemoryHistory from 'history/createMemoryHistory';
import { Route, MemoryRouter } from 'react-router';

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push,
} from 'react-router-redux';

// import reducers from './reducers' // Or wherever you keep your reducers
import { checksum } from './reducers/checksum';
import { update } from './reducers/update';

// Create a history of your choosing (we're using a browser history in this case)
const history = createMemoryHistory();
history.push('/');

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
import { updateIpc } from './actions/update';

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
import App from './components/App';

const composeEnhancers =
  (window as any).window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    checksum,
    update,
    router: routerReducer,
  }),
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(updateIpc, middleware),
  ),
);

import './styles/style.less';

const Application = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

window.onload = () => {
  ReactDOM.render(<Application />, document.getElementById('app'));
};
