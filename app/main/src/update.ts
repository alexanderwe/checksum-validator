import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import * as path from 'path';

// TODO: Get autoupdater in dev to work


export default class Updater {

    constructor() {
        autoUpdater.updateConfigPath = 'dev-app-update.yml';

        let intervalId: number = this.createInterval();

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
