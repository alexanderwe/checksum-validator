import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
import App from './components/App';
import store, { history } from './store';

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
