// Basic init
import { app, BrowserWindow, Menu } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

import AppUpdater from './AppUpdater';
import IPCHandler from './IPCHandler';
import MenuBuilder from './MenuBuilder';
import TouchBarBuilder from './TouchBarBuilder';
import Database from './Database';

if (process.env.ELECTRON_DEV) {
  console.log('DEV ENVIRONMENT');
  require('electron-reload')(path.join(__dirname, '/../build'));
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow;
let ipcHandler: IPCHandler;
let appUpdater: AppUpdater;
let database: Database;

/**
 * @function createWindow
 * @return {void} Creates a new main window with the index.html loaded
 */
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 320,
    resizable: true,
    show: true,
    titleBarStyle: 'hidden',
    width: 500,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`);

  // Open the DevTools.
  if (process.env.ELECTRON_DEV) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Init ipcHandler
  ipcHandler = new IPCHandler(mainWindow);
  appUpdater = new AppUpdater(ipcHandler);
  database = new Database(ipcHandler);
  ipcHandler.updater = appUpdater;
  ipcHandler.database = database;

  // Init the touchbar with ipcHandler support to send events to the renderer process
  mainWindow.setTouchBar(new TouchBarBuilder(ipcHandler).build());

  // Build the application menu
  const menu = Menu.buildFromTemplate(new MenuBuilder(appUpdater).build());
  Menu.setApplicationMenu(menu);
}

app.on('ready', () => {
  createWindow();

  if (process.env.ELECTRON_DEV) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));

    installExtension(REDUX_DEVTOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
