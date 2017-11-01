import { ipcRenderer } from 'electron';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';

import './styles/app.css';

window.onload = () => {
    ReactDOM.render(<App />, document.getElementById('app'));
};
