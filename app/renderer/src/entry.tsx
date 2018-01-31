import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';

import './styles/app.scss';
import 'antd/dist/antd.css';

window.onload = () => {
  ReactDOM.render(<App />, document.getElementById('app'));
};
