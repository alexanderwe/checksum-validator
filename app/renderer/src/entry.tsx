import { ipcRenderer } from 'electron';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './components/main';

import './styles/app.css';

window.onload = () => {
    ReactDOM.render(<Main />, document.getElementById('app'));
};
