import { app, Menu, shell, BrowserWindow } from 'electron';
import * as os from 'os';
import * as path from 'path';
import * as username from 'username';
import I18n from '../../lib/i18n/I18n';
import AppUpdater from './AppUpdater';
import IPCHandler from './IPCHandler';
import { Events } from '../../lib/Events';

export default class MenuBuilder {
  private i18n: I18n;
  private updater: AppUpdater;
  private ipcHandler: IPCHandler;
  private mainWindow: BrowserWindow;

  constructor(
    updater: AppUpdater,
    ipcHandler: IPCHandler,
    mainWindow: BrowserWindow,
  ) {
    this.updater = updater;
    this.ipcHandler = ipcHandler;
    this.i18n = new I18n();
    this.mainWindow = mainWindow;
  }

  /**
   * @function build
   * @description Build the Electron menu
   * @return {Electron.MenuItemConstructorOptions[]} returns an array containing the menu items
   */
  public build(): Electron.MenuItemConstructorOptions[] {

    if (process.platform === 'darwin') {
      return [
        {
          label: app.getName(),
          submenu: [
            { role: 'about', label: this.i18n.translate('about') },
            {
              click: () => {
                this.updater.checkForUpdate();
              },
              label: this.i18n.translate('check for updates'),
            },
            { type: 'separator' },
            {
              role: 'settings',
              label: this.i18n.translate('settings'),
              accelerator: 'CmdOrCtrl+,',
              click: () => {
                this.ipcHandler.sendToRenderer(Events.ROUTE_SETTINGS, {});
              },
            },
            { type: 'separator' },
            { role: 'hide', label: this.i18n.translate('hide') },
            { role: 'hideothers', label: this.i18n.translate('hide others') },
            { role: 'unhide', label: this.i18n.translate('unhide') },
            { type: 'separator' },
            { role: 'quit', label: this.i18n.translate('quit') },
          ],
        },
        {
          label: this.i18n.translate('edit'),
          submenu: [
            { type: 'separator' },
            { role: 'cut', label: this.i18n.translate('cut') },
            { role: 'copy', label: this.i18n.translate('copy') },
            { role: 'paste', label: this.i18n.translate('paste') },
          ],
        },
        {
          label: this.i18n.translate('help'),
          role: 'help',
          submenu: [
            {
              click: () => {
                shell.openExternal(
                  'https://github.com/alexanderwe/checksum-validator',
                );
              },
              label: this.i18n.translate('learn more'),
            },
            {
              click: () => {
                let platform = os.platform();
                if (platform === 'darwin') {
                  shell.openItem(
                    path.join(
                      '/Users/',
                      username.sync(),
                      '/Library/logs/checksum-validator/log.log',
                    ),
                  );
                } else if (platform === 'win32') {
                  shell.openItem(
                    path.join('C:\\Users\\', username.sync(),'\\AppData\\Roaming\\checksum-validator\\log.log'),
                  );
                }
              },
              label: this.i18n.translate('open logs'),
            },
            {
              click: () => {
                this.mainWindow.webContents.openDevTools();
              },
              label: this.i18n.translate('toggle developer tools'),
            },
          ],
        },
      ];
    } else if (process.platform === 'win32') {
      return [
        {
          label: app.getName(),
          submenu: [
            {
              click: () => {
                this.updater.checkForUpdate();
              },
              label: this.i18n.translate('check for updates'),
            },
            { type: 'separator' },
            {
              role: 'settings',
              label: this.i18n.translate('settings'),
              accelerator: 'CmdOrCtrl+,',
              click: () => {
                this.ipcHandler.sendToRenderer(Events.ROUTE_SETTINGS, {});
              },
            },
            { type: 'separator' },
            { type: 'separator' },
            { role: 'quit', label: this.i18n.translate('quit') },
          ],
        },
        {
          label: this.i18n.translate('edit'),
          submenu: [
            { type: 'separator' },
            { role: 'cut', label: this.i18n.translate('cut') },
            { role: 'copy', label: this.i18n.translate('copy') },
            { role: 'paste', label: this.i18n.translate('paste') },
          ],
        },
        {
          label: this.i18n.translate('help'),
          role: 'help',
          submenu: [
            {
              click: () => {
                shell.openExternal(
                  'https://github.com/alexanderwe/checksum-validator',
                );
              },
              label: this.i18n.translate('learn more'),
            },
            {
              click: () => {
                let platform = os.platform();
                if (platform === 'darwin') {
                  shell.openItem(
                    path.join(
                      '/Users/',
                      username.sync(),
                      '/Library/logs/checksum-validator/log.log',
                    ),
                  );
                } else if (platform === 'win32') {
                  shell.openItem(
                    path.join('C:\\Users\\', username.sync(),'\\AppData\\Roaming\\checksum-validator\\log.log'),
                  );
                }
              },
              label: this.i18n.translate('open logs'),
            },
            {
              click: () => {
                this.mainWindow.webContents.openDevTools();
              },
              label: this.i18n.translate('toggle developer tools'),
            },
          ],
        },
      ];
    }
  }
}
