import { dialog } from 'electron';
import electronLog from 'electron-log';
import * as Store from 'electron-store';
import { autoUpdater } from 'electron-updater';
import I18n from '../../lib/i18n/I18n';
import { Events } from '../../lib/Events';
import IPCHandler from './IPCHandler';

export default class AppUpdater {
  private ipcHandler: IPCHandler;
  private i18n: I18n;
  private settings: Store;

  constructor(ipcHandler: IPCHandler) {
    this.ipcHandler = ipcHandler;
    this.i18n = new I18n();
    this.settings = new Store();

    autoUpdater.autoDownload = false;

    if (process.env.ELECTRON_DEV) {
      autoUpdater.updateConfigPath = 'dev-app-update.yml';
    }

    electronLog.info('(Main) - Checking for Updates');
    autoUpdater.checkForUpdates();

    
    autoUpdater.logger = electronLog;

    autoUpdater.on('error', error => {
      this.ipcHandler.sendToRenderer(Events.UPDATE, {
        error: true,
        msg: this.i18n.translate('update error') + ' ' + error,
        updateAvailable: false,
      });
    });

    autoUpdater.on('update-available', () => {
      if (this.settings.get('automaticUpdate')) {
        autoUpdater.downloadUpdate();
      } else {
        this.ipcHandler.sendToRenderer(Events.UPDATE, {
          error: false,
          msg: this.i18n.translate('update available'),
          updateAvailable: true,
        });
      }
    });

    autoUpdater.on('download-progress', progressObj => {
      const logMessage = 'Downloaded ' + Math.round(progressObj.percent) + '%';
      this.ipcHandler.sendToRenderer(Events.UPDATE_DOWNLOADING, {
        error: false,
        msg: logMessage,
        downloading: true,
        updating: true,
        downloadPercentage: Math.round(progressObj.percent),
        updateAvailable: true,
      });
    });

    autoUpdater.on('update-downloaded', () => {
      if (this.settings.get('automaticUpdate')) {
        autoUpdater.quitAndInstall();
      } else {
        this.ipcHandler.sendToRenderer(Events.UPDATE_DOWNLOADED, {
          error: false,
          msg: 'Update downloaded',
          downloading: false,
          updating: true,
          downloadPercentage: 100,
          updateAvailable: true,
        });
      }
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

  public quitAndInstall = () => {
    autoUpdater.quitAndInstall();
  }

  public checkForUpdate = () => {
    this.ipcHandler.sendToRenderer('update:check', {});
    autoUpdater.checkForUpdates();
  };
}
