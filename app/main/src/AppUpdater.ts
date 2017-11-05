import { dialog } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import IPCHandler from './IPCHandler';

export default class AppUpdater {

    private ipcHandler: IPCHandler;

    constructor(ipcHandler: IPCHandler) {
        this.ipcHandler = ipcHandler;

        autoUpdater.autoDownload = false;

        if (process.env.ELECTRON_DEV) {
            autoUpdater.updateConfigPath = 'dev-app-update.yml';
        }

        autoUpdater.checkForUpdates();

        log.transports.file.level = 'info';
        autoUpdater.logger = log;

        autoUpdater.on('error', (error) => {
            this.ipcHandler.sendToRenderer('update', {
                error: true,
                msg: 'Error while checking updates ' + error,
                updateAvailable: false,
            });
        });

        autoUpdater.on('update-available', () => {
            this.ipcHandler.sendToRenderer('update', {
                error: false,
                msg: 'Update available',
                updateAvailable: true,
            });
        });

        autoUpdater.on('download-progress', (progressObj) => {
            const logMessage = 'Downloaded ' + Math.round(progressObj.percent) + '%';
            this.ipcHandler.sendToRenderer('update', {
                error: false,
                msg: logMessage,
                updateAvailable: true,
            });
        });

        autoUpdater.on('update-downloaded', () => {
            autoUpdater.quitAndInstall();
        });

        autoUpdater.on('update-not-available', () => {
            this.ipcHandler.sendToRenderer('update', {
                error: false,
                msg: 'You have the latest version',
                updateAvailable: false,
            });
        });

        autoUpdater.on('error', (error) => {
            this.ipcHandler.sendToRenderer('update', {
                error: true,
                msg: error,
                updateAvailable: false,
            });
        });
    }

    public update = () => {
        autoUpdater.downloadUpdate();
    }

    public checkForUpdate = () => {
        this.ipcHandler.sendToRenderer('checkForUpdate', {});
        autoUpdater.checkForUpdates();
    }
}
