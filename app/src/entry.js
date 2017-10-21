import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main.jsx';
import { ipcRenderer } from 'electron';

import './styles/app.css';

window.onload = function() {
    ReactDOM.render(<Main />, document.getElementById('app'));
};
