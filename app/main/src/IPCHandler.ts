import { BrowserWindow, clipboard, ipcMain } from 'electron';
import AppUpdater from './AppUpdater';
import Database, { ICheck, ChecksumAlgorithm } from './Database';
import Checksum from './Checksum';

/**
 * @class IPCHandler
 * @desc  Handles all the IPC calls in the main process
 */
export default class IPCHandler {
  public updater: AppUpdater;
  public database: Database;
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;

    ipcMain
      .on('checksum', async (event: any, arg: any) => {
        event.sender.send('checksum', {}); // main received event and acknowledge it to renderer

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

        if (arg.saveClipboard && !error) {
          clipboard.writeText(checksumResultString);
        }

        if (true /*arg.saveDatabase && !error*/) {
          const check: ICheck = {
            checksums: await Checksum.allChecksums(arg.filepath),
            checkString: arg.checksum as String,
            checkAlgorithm: arg.type as ChecksumAlgorithm,
            didMatch: didMatch as boolean,
            filePath: arg.filepath as String,
          };

          this.database.addCheck(check);
        }

        event.sender.send('checksum-result', {
          checksumResult: checksumResultString,
          currentChecksum: arg.checksum,
          error: error ? error : false,
          match: didMatch,
        });
      })
      .on('update:app', async (event: any, arg: any) => {
        this.updater.update();
      })
      .on('update:check', async (event: any, arg: any) => {
        this.updater.checkForUpdate();
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
