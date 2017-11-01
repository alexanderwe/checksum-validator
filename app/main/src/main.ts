// Basic init
import { app, BrowserWindow, Menu } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

import IPCHandler from './IPCHandler';
import { menuTemplate } from './menu';
import TouchBarBuilder from './TouchBarBuilder';

if (process.env.ELECTRON_DEV) {
    require('electron-reload')(path.join(__dirname, '/../../renderer/build/'));
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow;
let ipcHandler: IPCHandler;

/**
 * @function createWindow
 * @return {void} Creates a new main window with the index.html loaded
 */
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 300,
        resizable: false,
        show: true,
        titleBarStyle: 'hidden',
        width: 300,
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/../../renderer/index.html`);

    // Open the DevTools.
    if (process.env.ELECTRON_DEV) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Init ipcHandler
    ipcHandler = new IPCHandler(mainWindow);

    // Init the touchbar with ipcHandler support to send events to the renderer process
    mainWindow.setTouchBar(new TouchBarBuilder(ipcHandler).build());

    // Build the application menu
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

app.on('ready', () => {
    createWindow();
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
