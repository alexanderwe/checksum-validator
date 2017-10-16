import { autoUpdater } from 'electron-updater';
import logger from 'electron-log';
import { dialog } from 'electron';
import ms from 'ms';
import path from 'path';

autoUpdater.logger = logger;
autoUpdater.logger.transports.file.level = 'info';
//TODO: Get autoupdater in dev to work
autoUpdater.updateConfigPath = 'dev-app-update.yml';

const createInterval = () =>
    setInterval(() => {
        logger.info('Checking for updates');
        dialog.showMessageBox({
            message: 'Checking for updates'
        });
        autoUpdater.checkForUpdates();
    }, ms('5m'));

export function update() {
    setTimeout(() => autoUpdater.checkForUpdates(), ms('5s'));

    let intervalId = createInterval();

    autoUpdater.on('error', error => {
        logger.info('error');
        clearInterval(intervalId);
        intervalId = null;
        dialog.showMessageBox({
            message: 'Error while checking updates' + error
        });
    });

    autoUpdater.on('update-available', () => {
        logger.info('update-available');
        clearInterval(intervalId);
        intervalId = null;
    });

    autoUpdater.on('update-downloaded', () => {
        dialog.showMessageBox(
            {
                message: 'Eine Neue version wurde gedownloadet'
            },
            () => autoUpdater.quitAndInstall()
        );
    });

    autoUpdater.on('update-not-available', () => {
        logger.info('update-not-available');
        dialog.showMessageBox({
            message: 'Update not available'
        });
    });

    autoUpdater.on('error', err => {
        if (intervalId === null) {
            intervalId = createInterval();
        }
        logger.info('Error fetching updates', err.stack);
    });
}
