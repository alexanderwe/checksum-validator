import { dialog } from 'electron';
import electronLog from 'electron-log';
import { autoUpdater } from 'electron-updater';
import I18n from '../../lib/i18n/I18n';
import IPCHandler from './IPCHandler';

export default class AppUpdater {
  private ipcHandler: IPCHandler;
  private i18n: I18n;

  constructor(ipcHandler: IPCHandler) {
    this.ipcHandler = ipcHandler;
    this.i18n = new I18n();

    autoUpdater.autoDownload = false;

    if (process.env.ELECTRON_DEV) {
      autoUpdater.updateConfigPath = 'dev-app-update.yml';
    }

    electronLog.info('checking for Updates');
    autoUpdater.checkForUpdates();

    electronLog.transports.file.level = 'info';
    autoUpdater.logger = electronLog;

    autoUpdater.on('error', error => {
      this.ipcHandler.sendToRenderer('update', {
        error: true,
        msg: this.i18n.translate('update error') + ' ' + error,
        updateAvailable: false,
      });
    });

    autoUpdater.on('update-available', () => {
      this.ipcHandler.sendToRenderer('update', {
        error: false,
        msg: this.i18n.translate('update available'),
        updateAvailable: true,
      });
    });

    autoUpdater.on('download-progress', progressObj => {
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
        msg: this.i18n.translate('update latest'),
        updateAvailable: false,
      });
    });

    autoUpdater.on('error', error => {
      this.ipcHandler.sendToRenderer('update', {
        error: true,
        msg: error,
        updateAvailable: false,
      });
    });
  }

  public update = () => {
    autoUpdater.downloadUpdate();
  };

  public checkForUpdate = () => {
    this.ipcHandler.sendToRenderer('checkForUpdate', {});
    autoUpdater.checkForUpdates();
  };
}
