// Basic init
const exec = require('child_process').exec;
const { app, BrowserWindow, clipboard, dialog, ipcMain, menu, nativeImage, Tray } = require('electron');
const path = require('path');
const url = require('url');
const update = require('./update');
// Let electron reloads by itself when webpack watches changes in ./app/
if (process.env.ELECTRON_DEV) {
    require('electron-reload')(__dirname);
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = undefined;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 310,
        height: 310,
        show: true,
        resizable: false,
        titleBarStyle: 'hidden'
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/renderer/index.html`);

    // Open the DevTools.
    if (process.env.ELECTRON_DEV) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    require('./menu');
}

app.on('ready', () => {
    createWindow();
    update();
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

/**
 * COMMUNICATION OF RENDERER AND MAIN PROCESS
 **/
ipcMain.on('checksum', (event, arg) => {
    switch (arg.type) {
        case 'SHA512':
            var child = exec('shasum -a 512 ' + arg.filepath.replace(/ /g, '\\ '), function(error, stdout, stderr) {
                var checksumResult = stdout.split(' ')[0].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                var match = checksumResult == arg.checksum ? true : false;
                arg.saveChecksum ? clipboard.writeText(checksumResult) : null;
                event.sender.send('checksum-result', {
                    checksumResult: checksumResult,
                    match: match
                });
            });
            break;
        case 'SHA256':
            var child = exec('shasum -a 256 ' + arg.filepath.replace(/ /g, '\\ '), function(error, stdout, stderr) {
                var checksumResult = stdout.split(' ')[0].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                arg.saveChecksum ? clipboard.writeText(checksumResult) : null;
                var match = checksumResult == arg.checksum ? true : false;
                event.sender.send('checksum-result', {
                    checksumResult: checksumResult,
                    match: match
                });
            });
            break;
        case 'SHA1':
            var child = exec('openssl sha1 ' + arg.filepath.replace(/ /g, '\\ '), function(error, stdout, stderr) {
                var checksumResult = stdout.split('= ')[1].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                arg.saveChecksum ? clipboard.writeText(checksumResult) : null;
                var match = checksumResult === arg.checksum ? true : false;
                event.sender.send('checksum-result', {
                    checksumResult: checksumResult,
                    match: match
                });
            });
            break;
        case 'MD5':
            var child = exec('openssl md5 ' + arg.filepath.replace(/ /g, '\\ '), function(error, stdout, stderr) {
                var checksumResult = stdout.split('= ')[1].trim();
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                arg.saveChecksum ? clipboard.writeText(checksumResult) : null;
                var match = checksumResult == arg.checksum ? true : false;
                event.sender.send('checksum-result', {
                    checksumResult: checksumResult,
                    match: match
                });
            });
            break;
        default:
            break;
    }
});
