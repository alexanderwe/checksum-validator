// Basic init
import * as child from 'child_process';
import { app, BrowserWindow, clipboard, dialog, ipcMain, Menu, nativeImage, TouchBar, Tray } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import { menuTemplate } from './menu';
import { touchBar } from './touchbar';
import Updater from './update';

if (process.env.ELECTRON_DEV) {
    require('electron-reload')(path.join(__dirname, '/../../renderer/build/'));
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow;
let updater: Updater;

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

    mainWindow.setTouchBar(touchBar);
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

app.on('ready', () => {
    createWindow();
    // updater = new Updater(); // TODO: This is not working, some modules are not found 
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

/**
 * COMMUNICATION OF RENDERER AND MAIN PROCESS
 * TODO: Move this functionality into separate class
 */
ipcMain.on('checksum', (event: any, arg: any) => {
    switch (arg.type) {
        case 'SHA512':
            child.exec('shasum -a 512 ' + arg.filepath.replace(/ /g, '\\ '), (error, stdout, stderr) => {
                const checksumResultString = stdout.split(' ')[0].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                const didMatch = checksumResultString === arg.checksum ? true : false;

                if (arg.saveChecksum) {
                    clipboard.writeText(checksumResultString);
                }

                event.sender.send('checksum-result', {
                    checksumResult: checksumResultString,
                    match: didMatch,
                });
            });
            break;
        case 'SHA256':
            child.exec('shasum -a 256 ' + arg.filepath.replace(/ /g, '\\ '), (error, stdout, stderr) => {
                const checksumResultString = stdout.split(' ')[0].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                const didMatch = checksumResultString === arg.checksum ? true : false;

                if (arg.saveChecksum) {
                    clipboard.writeText(checksumResultString);
                }

                event.sender.send('checksum-result', {
                    checksumResult: checksumResultString,
                    match: didMatch,
                });
            });
            break;
        case 'SHA1':
            child.exec('openssl sha1 ' + arg.filepath.replace(/ /g, '\\ '), (error, stdout, stderr) => {
                const checksumResultString = stdout.split(' ')[0].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                const didMatch = checksumResultString === arg.checksum ? true : false;

                if (arg.saveChecksum) {
                    clipboard.writeText(checksumResultString);
                }

                event.sender.send('checksum-result', {
                    checksumResult: checksumResultString,
                    match: didMatch,
                });
            });
            break;
        case 'MD5':
            child.exec('openssl md5 ' + arg.filepath.replace(/ /g, '\\ '), (error, stdout, stderr) => {
                const checksumResultString = stdout.split(' ')[0].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                const didMatch = checksumResultString === arg.checksum ? true : false;

                if (arg.saveChecksum) {
                    clipboard.writeText(checksumResultString);
                }

                event.sender.send('checksum-result', {
                    checksumResult: checksumResultString,
                    match: didMatch,
                });
            });
            break;
        default:
            break;
    }
});
