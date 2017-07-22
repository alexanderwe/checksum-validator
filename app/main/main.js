const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const {
    ipcMain
} = require("electron");
const path = require("path");
const url = require("url");

var exec = require("child_process").exec;
const {
    dialog
} = require("electron");

var menubar = require("menubar");

/*var mb = menubar({
    tooltip: "You are 1 click away from awesomeness",
    icon: "Icon/Icon.png",
    index: path.join("file://", __dirname, "../renderer/index.html"),
    height: 300,
    width: 300
});

mb.on("ready", function ready() {
    console.log("app is ready");
});*/


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        resizable: false,
        fullscreen: false,
        titleBarStyle: 'hidden'
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
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