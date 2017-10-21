// Basic init
const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const { ipcMain, Tray, nativeImage } = require('electron');
const path = require('path');
const url = require('url');
var exec = require('child_process').exec;
const { dialog } = require('electron');
const { clipboard } = require('electron');

// Let electron reloads by itself when webpack watches changes in ./app/

if (process.env.ELECTRON_DEV) {
    require('electron-reload')(__dirname);
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = undefined;
let tray = undefined;

function createWindow() {
    /*
    let icon = nativeImage.createFromDataURL(base64Icon)
    tray = new Tray(icon)


    // Add a click handler so that when the user clicks on the menubar icon, it shows
    // our popup window
    tray.on('click', function (event) {
        toggleWindow()

        // Show devtools when command clicked
        if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
            mainWindow.openDevTools({ mode: 'detach' })
        }
    })*/

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 300,
        height: 340,
        show: true
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/renderer/index.html`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

const toggleWindow = () => {
    if (mainWindow.isVisible()) {
        mainWindow.hide();
    } else {
        showWindow();
    }
};

const showWindow = () => {
    const trayPos = tray.getBounds();
    const windowPos = mainWindow.getBounds();
    let x,
        y = 0;
    if (process.platform == 'darwin') {
        x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2);
        y = Math.round(trayPos.y + trayPos.height);
    } else {
        x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2);
        y = Math.round(trayPos.y + trayPos.height * 10);
    }

    mainWindow.setPosition(x, y, false);
    mainWindow.show();
    mainWindow.focus();
};

app.on('ready', () => {
    createWindow();
    //update(); //TODO: enable update again
    //app.dock.hide();
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
