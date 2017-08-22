const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const {
    ipcMain,
    Tray,
    nativeImage
} = require("electron");
const path = require("path");
const url = require("url");
var exec = require("child_process").exec;
const {
    dialog
} = require("electron");
const log = require('electron-log');
const update = require('./update');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = undefined;
let tray = undefined;
function createWindow() {

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
    })



    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        resizable: true,
        fullscreen: false,
        frame: false,
        show: false,
    });

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "../renderer/index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

const toggleWindow = () => {
    if (mainWindow.isVisible()) {
        mainWindow.hide()
    } else {
        showWindow()
    }
}

const showWindow = () => {
    const trayPos = tray.getBounds()
    const windowPos = mainWindow.getBounds()
    let x, y = 0
    if (process.platform == 'darwin') {
        x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
        y = Math.round(trayPos.y + trayPos.height)
    } else {
        x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
        y = Math.round(trayPos.y + trayPos.height * 10)
    }


    mainWindow.setPosition(x, y, false)
    mainWindow.show()
    mainWindow.focus()
}


app.on("ready", () => {
    createWindow();
    //update();
    app.dock.hide();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});


/**
 * COMMUNICATION OF RENDERER AND MAIN PROCESS
 **/
ipcMain.on("checksum", (event, arg) => {
    switch (arg.type) {
        case "SHA512":
            var child = exec(
                "shasum -a 512 " + arg.filepath.replace(/ /g, "\\ "),
                function (error, stdout, stderr) {
                    var checksumResult = stdout.split(" ")[0].trim();
                    if (error !== null) {
                        console.log("exec error: " + error);
                    }
                    var match = checksumResult == arg.checksum ? true : false;
                    event.sender.send("checksum-result", {
                        checksumResult: checksumResult,
                        match: match
                    });
                }
            );
            break;
        case "SHA256":
            var child = exec(
                "shasum -a 256 " + arg.filepath.replace(/ /g, "\\ "),
                function (error, stdout, stderr) {
                    var checksumResult = stdout.split(" ")[0].trim();
                    if (error !== null) {
                        console.log("exec error: " + error);
                    }
                    var match = checksumResult == arg.checksum ? true : false;
                    event.sender.send("checksum-result", {
                        checksumResult: checksumResult,
                        match: match
                    });
                }
            );
            break;
        case "SHA1":
            var child = exec(
                "openssl sha1 " + arg.filepath.replace(/ /g, "\\ "),
                function (error, stdout, stderr) {
                    var checksumResult = stdout.split("= ")[1].trim();
                    if (error !== null) {
                        console.log("exec error: " + error);
                    }
                    var match = checksumResult === arg.checksum ? true : false;
                    event.sender.send("checksum-result", {
                        checksumResult: checksumResult,
                        match: match
                    });
                }
            );
            break;
        case "MD5":
            var child = exec(
                "openssl md5 " + arg.filepath.replace(/ /g, "\\ "),
                function (error, stdout, stderr) {
                    var checksumResult = stdout.split("= ")[1].trim();
                    if (error !== null) {
                        console.log("exec error: " + error);
                    }
                    var match = checksumResult == arg.checksum ? true : false;
                    event.sender.send("checksum-result", {
                        checksumResult: checksumResult,
                        match: match
                    });
                }
            );
            break;
        default:
            break;
    }
});

ipcMain.on("open-file-dialog", (event, data) => {
    dialog.showOpenDialog(data.fileDialogOptions, function (fileNames) {
        if (fileNames === undefined) {
            console.log("You didn't choose the file");
            return;
        }
        console.log(data.fileDialogOptions.type);
        event.sender.send("set-file-path", {
            path: fileNames[0]
        });
    });
});


let base64Icon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw
7AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkZCg87wZW7ewA
AAp1JREFUOMuV1U2IVlUcx/HPnbc0MWwEF40hRWRQmWhEUi4KorlTQ0zQKgqSxKinRYuWrdq0iIp8DAy
CFmYUUVTYY0Qw0SsYVDQRlFlQU4o4VDMUY9NzWtz/45znzo3yv7n/l3O+53fOPS+F/7R9G0l34Vlap/x
PG+gPby76471jpJdxI4p/x5QrakPVZ3yI4lLSLH4LpetIT5N24AWKpZXAW4boXogFnGxQXEzhdQYHl0v
pbtJkBIOkBqXpVhzAWIPi8hocxCyH5qp0e10oHY6BNy3P7szULyc9hzkGTjat8WPRqctkD3QORrJ211J
srPV7CKP4i7S6CXxF+GtY2lG5D5yg+D6bckHaRXs463dV+OtJVzeBj4Q/inuy2uf4NYPvyVR38Vn4GzD
ZAC5ezHbITsqtEU8HvGcjpFblDncpDma16yhvqit+c3mLuQj3Vm7rJ4r3kW+z+6sD80aKQWcivwm318B
pHk9mA11PuSXil/B1thyrSA9HMI8nMtYNlDszcKdbHVcLkduCO0L1VxTv1VTv5plR3lrCuzga+c2YqB2
QNEfqjV7EWl8c8X78kKleTTfWeuA49maDjlNuz8CHFykOYDEabKvg0Jqh+AB/Z4D7qs+h03gbxyK/FVf
WL6FfsC/8tdGoZ0/hRKZ6A+2pUP1jdZecse01cGcBr2YNzqdcG6q/oDgS+7e3XLeF6j/wTvzM6Lfi2nQ
KP8e0P6Ezn9X2488MvLnW75vwP2wCr8J5eD4upsxaHZzOwNNZcU2c3FfwWg1cDuISfIxH6fzedE8G90s
8nuXH8B0eoXNc/6tQjsQfXaQz0/BEXUD3W4oF0hQPflTlJwZIl+FcOp86e2vvoj1Le6I/P974ZA2dBXk
97qQ13Z8+3PS0+AdjKa1R95YOZgAAAABJRU5ErkJggg==`