import { dialog } from 'electron';
import electronLog from 'electron-log';
import { autoUpdater } from 'electron-updater';
import I18n from '../../lib/i18n/I18n';
import { Events } from '../../lib/Events';
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
      this.ipcHandler.sendToRenderer(Events.UPDATE, {
        error: true,
        msg: this.i18n.translate('update error') + ' ' + error,
        updateAvailable: false,
      });
    });

    autoUpdater.on('update-available', () => {
      this.ipcHandler.sendToRenderer(Events.UPDATE, {
        error: false,
        msg: this.i18n.translate('update available'),
        updateAvailable: true,
      });
    });

    autoUpdater.on('download-progress', progressObj => {
      const logMessage = 'Downloaded ' + Math.round(progressObj.percent) + '%';
      this.ipcHandler.sendToRenderer(Events.UPDATE_DOWNLOADING, {
        error: false,
        msg: logMessage,
        downloading: true,
        downloadPercentage: Math.round(progressObj.percent),
        updateAvailable: true,
      });
    });

    autoUpdater.on('update-downloaded', () => {
      autoUpdater.quitAndInstall();
    });

    autoUpdater.on('update-not-available', () => {
      this.ipcHandler.sendToRenderer(Events.UPDATE, {
        error: false,
        msg: this.i18n.translate('update latest'),
        updateAvailable: false,
      });
    });
  }

  public update = () => {
    autoUpdater.downloadUpdate();
  };

  public checkForUpdate = () => {
    this.ipcHandler.sendToRenderer('update:check', {});
    autoUpdater.checkForUpdates();
  };
}
