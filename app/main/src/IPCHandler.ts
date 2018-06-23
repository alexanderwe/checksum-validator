import * as fs from 'fs';

import { BrowserWindow, clipboard, dialog, ipcMain } from 'electron';
import * as Store from 'electron-store';
import electronLog from 'electron-log';
import AppUpdater from './AppUpdater';
import Database, { ICheck, ChecksumAlgorithm } from './Database';
import Checksum from './Checksum';
import { Events } from '../../lib/Events';

/**
 * @class IPCHandler
 * @desc  Handles all the IPC calls in the main process
 */
export default class IPCHandler {
  public updater: AppUpdater;
  public database: Database;
  private mainWindow: BrowserWindow;
  public settings: Store;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.settings = new Store();

    ipcMain
      .on(Events.CHECKSUM, async (event: any, arg: any) => {
        event.sender.send(Events.CHECKSUM, {}); // main received event and acknowledge it to renderer
        console.log(arg);
        let checksumResultString: string;
        let didMatch: boolean;
        let error: boolean;

        try {
          switch (arg.type) {
            case 'SHA512':
              checksumResultString = await Checksum.sha512(arg.filepath);
              break;
            case 'SHA256':
              checksumResultString = await Checksum.sha256(arg.filepath);
              break;
            case 'SHA1':
              checksumResultString = await Checksum.sha1(arg.filepath);
              break;
            case 'MD5':
              checksumResultString = await Checksum.md5(arg.filepath);
              break;
            default:
              break;
          }
        } catch (e) {
          error = true;
        }

        console.log(checksumResultString);

        didMatch = checksumResultString === arg.checksum ? true : false;

        // Only save to clipboard if checksumResultString is available
        if (arg.saveCheckClipboard && checksumResultString) {
          clipboard.writeText(checksumResultString);
        }

        if (arg.saveChecks && !error) {
          electronLog.info('Saving check to database');
          const check: ICheck = {
            checksums: await Checksum.allChecksums(arg.filepath),
            checkString: arg.checksum as String,
            checkAlgorithm: arg.type as ChecksumAlgorithm,
            didMatch: didMatch as boolean,
            filePath: arg.filepath as String,
          };

          this.database.addCheck(check);
        }

        event.sender.send(Events.CHECKSUM_RESULT, {
          checksumResult: checksumResultString,
          currentChecksum: arg.checksum,
          error: error ? error : false,
          match: didMatch,
        });
      })
      .on(Events.UPDATE, async (event: any, arg: any) => {
        this.updater.update();
      })
      .on(Events.UPDATE_CHECK, async (event: any, arg: any) => {
        this.updater.checkForUpdate();
      })
      .on(Events.UPDATE_QUIT_AND_INSTALL, async (event: any, arg: any) => {
        this.updater.quitAndInstall();
      })
      .on(Events.DATABASE_CHECKS_RELOAD, async (event: any, arg: any) => {
        this.database.refreshDB();
      })
      .on(Events.DATABASE_CHECK_DELETE, async (event: any, arg: any) => {
        this.database.deleteCheck(arg._id);
      })
      .on(Events.DATABASE_CHECK_EXPORT, async (event: any, arg: any) => {
        const check = await this.database.getCheck(arg._id);

        dialog.showSaveDialog(
          {
            filters: [{ name: 'json', extensions: ['json'] }],
            defaultPath:
              (check as any).filePath.split('/').pop() + '_checksums',
          },
          fileName => {
            if (fileName === undefined) return;
            fs.writeFile(fileName, JSON.stringify(check), err => {
              event.sender.send(Events.DATABASE_CHECK_EXPORT_SUCCESS, {});
            });
          },
        );
      })
      .on(Events.SETTINGS_LOAD, async (event: any, arg: any) => {
        event.sender.send(Events.SETTINGS_LOAD, { ...this.settings.store });
      })
      .on(Events.SETTINGS_UPDATED, async (event: any, arg: any) => {
        this.settings.set(arg.key, arg.value);
        event.sender.send(Events.SETTINGS_LOAD, { ...this.settings.store });
      });
  }

  /**
   * @function sendToRenderer
   * @param channelName Name of the channel to send data to
   * @param data Data to send
   */
  public sendToRenderer(channelName: string, data: object) {
    this.mainWindow.webContents.send(channelName, data);
  }
}
