import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import * as path from 'path';

// TODO: Get autoupdater in dev to work
autoUpdater.updateConfigPath = 'dev-app-update.yml';

const createInterval = () =>
    setInterval(() => {
        dialog.showMessageBox({
            message: 'Checking for updates',
        });
        autoUpdater.checkForUpdates();
    }, 300000); // 5 minutes 

export function update() {
    setTimeout(() => autoUpdater.checkForUpdates(), 5000);

    let intervalId = createInterval();

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

    autoUpdater.on('error', err => {
        if (intervalId === null) {
            intervalId = createInterval();
        }
    });
}
