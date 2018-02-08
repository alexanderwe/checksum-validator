import { BrowserWindow, clipboard, ipcMain } from 'electron';
import * as Store from 'electron-store';
import AppUpdater from './AppUpdater';
import Database, { ICheck, ChecksumAlgorithm } from './Database';
import Checksum from './Checksum';
import { Events } from './Events';

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
        const calculateAll = event.calculateAll;
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

        didMatch = checksumResultString === arg.checksum ? true : false;

        if (arg.saveCheckClipboard) {
          clipboard.writeText(checksumResultString);
        }

        if (arg.saveChecks) {
          console.log('Saving check to database');

          const check: ICheck = {
            checksums: await Checksum.allChecksums(arg.filepath),
            checkString: arg.checksum as String,
            checkAlgorithm: arg.type as ChecksumAlgorithm,
            didMatch: didMatch as boolean,
            filePath: arg.filepath as String,
          };

          this.database.addCheck(check);
        } else {
          console.log('NOT saving check to database');
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
      .on(Events.DATABASE_CHECKS_RELOAD, async (event: any, arg: any) => {
        this.database.refreshDB();
      })
      .on(Events.SETTINGS_LOAD, async (event: any, arg: any) => {
        console.log('Load settings action initiaed from renderer');
        event.sender.send(Events.SETTINGS_LOAD, { ...this.settings.store });
      })
      .on(Events.SETTINGS_UPDATED, async (event: any, arg: any) => {
        this.settings.set(arg.key, arg.value);
        event.sender.send(Events.SETTINGS_LOAD, this.settings.store);
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
