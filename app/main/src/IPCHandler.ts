import { BrowserWindow, clipboard, ipcMain } from 'electron';
import AppUpdater from './AppUpdater';
import Checksum from './Checksum';

/**
 * @class IPCHandler
 * @desc  Handles all the IPC calls in the main process
 */
export default class IPCHandler {
  public updater: AppUpdater;
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;

    ipcMain
      .on('checksum', async (event: any, arg: any) => {
        event.sender.send('checksum', {}); // main received event and acknowledge it to renderer
        let checksumResultString: string;
        let didMatch: boolean;
        switch (arg.type) {
          case 'SHA512':
            try {
              checksumResultString = await Checksum.sha512(arg.filepath);
            } catch (e) {
              event.sender.send('checksum-result', {
                checksumResult: checksumResultString,
                currentChecksum: arg.checksum,
                error: true,
                match: didMatch,
              });
              break;
            }

            didMatch = checksumResultString === arg.checksum ? true : false;

            if (arg.saveChecksum) {
              clipboard.writeText(checksumResultString);
            }

            event.sender.send('checksum-result', {
              checksumResult: checksumResultString,
              currentChecksum: arg.checksum,
              error: false,
              match: didMatch,
            });
            break;
          case 'SHA256':
            try {
              checksumResultString = await Checksum.sha256(arg.filepath);
            } catch (e) {
              event.sender.send('checksum-result', {
                checksumResult: checksumResultString,
                currentChecksum: arg.checksum,
                error: true,
                match: didMatch,
              });
              break;
            }
            didMatch = checksumResultString === arg.checksum ? true : false;
            if (arg.saveChecksum) {
              clipboard.writeText(checksumResultString);
            }
            event.sender.send('checksum-result', {
              checksumResult: checksumResultString,
              currentChecksum: arg.checksum,
              error: false,
              match: didMatch,
            });

            break;
          case 'SHA1':
            try {
              checksumResultString = await Checksum.sha1(arg.filepath);
            } catch (e) {
              event.sender.send('checksum-result', {
                checksumResult: checksumResultString,
                currentChecksum: arg.checksum,
                error: true,
                match: didMatch,
              });
              break;
            }

            didMatch = checksumResultString === arg.checksum ? true : false;

            if (arg.saveChecksum) {
              clipboard.writeText(checksumResultString);
            }

            event.sender.send('checksum-result', {
              checksumResult: checksumResultString,
              currentChecksum: arg.checksum,
              error: false,
              match: didMatch,
            });
            break;
          case 'MD5':
            try {
              checksumResultString = await Checksum.md5(arg.filepath);
            } catch (e) {
              event.sender.send('checksum-result', {
                checksumResult: checksumResultString,
                currentChecksum: arg.checksum,
                error: true,
                match: didMatch,
              });
              break;
            }
            didMatch = checksumResultString === arg.checksum ? true : false;

            if (arg.saveChecksum) {
              clipboard.writeText(checksumResultString);
            }
            event.sender.send('checksum-result', {
              checksumResult: checksumResultString,
              currentChecksum: arg.checksum,
              error: false,
              match: didMatch,
            });
            break;
          default:
            break;
        }
      })
      .on('update-app', async (event: any, arg: any) => {
        this.updater.update();
      })
      .on('checkForUpdate', async (event: any, arg: any) => {
        this.updater.checkForUpdate();
      });
  }

  public sendToRenderer(eventName: string, data: object) {
    this.mainWindow.webContents.send(eventName, data);
  }
}
