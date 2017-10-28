import { dialog } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

export default class AppUpdater {
    constructor() {

        if (process.env.ELECTRON_DEV) {
            autoUpdater.updateConfigPath = 'dev-app-update.yml';
        }

        autoUpdater.checkForUpdatesAndNotify();

        log.transports.file.level = 'info';
        autoUpdater.logger = log;

        autoUpdater.on('error', (error) => {
            dialog.showMessageBox({
                message: 'Error while checking updates' + error,
            });
        });

        autoUpdater.on('update-available', () => {
            dialog.showMessageBox({
                message: 'Update available',
            });
        });

        autoUpdater.on('update-downloaded', () => {
            dialog.showMessageBox({
                message: 'Update downloaded',
            });
        });

        autoUpdater.on('update-not-available', () => {
            dialog.showMessageBox({
                message: 'Update not available',
            });
        });

        autoUpdater.on('error', (error) => {
            dialog.showMessageBox({
                message: error,
            });
        });
    }

    public update = () => {
        autoUpdater.checkForUpdatesAndNotify();
    }
}
