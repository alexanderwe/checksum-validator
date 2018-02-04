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

export const store = createStore(
  checksumApp,
  composeEnhancers(applyMiddleware(updateIpc, middleware)),
);

import './styles/style.less';

// TODO: Naming convention for actions and reducers
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
