import { dialog } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

export default class AppUpdater {
    constructor() {

        if (process.env.ELECTRON_DEV) {
            autoUpdater.updateConfigPath = 'dev-app-update.yml';
        }

        let intervalId: number = this.createInterval();

        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();

        autoUpdater.on('error', (error) => {
            clearInterval(intervalId);
            intervalId = null;
            dialog.showMessageBox({
                message: 'Error while checking updates' + error,
            });
        });

        autoUpdater.on('update-available', () => {
            clearInterval(intervalId);
            intervalId = null;
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
            if (intervalId === null) {
                intervalId = this.createInterval();
            }
        });
    }

    public update = () => {
        setTimeout(() => autoUpdater.checkForUpdates(), 5000);
    }

    private createInterval = (): any => {
        return setInterval(() => {
            dialog.showMessageBox({
                message: 'Checking for updates',
            });
            autoUpdater.checkForUpdates();
        }, 300000); // 5 mins
    }
}
