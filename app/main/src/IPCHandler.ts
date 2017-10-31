import { BrowserWindow, clipboard, ipcMain } from 'electron';
import Checksum from './Checksum';

/**
 * @class IPCHandler
 * @desc  Handles all the IPC calls in the main process
 */
export default class IPCHandler {

    private mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {

        this.mainWindow = mainWindow;

        ipcMain.on('checksum', async (event: any, arg: any) => {

            let checksumResultString: string;
            let didMatch: boolean;

            switch (arg.type) {
                case 'SHA512':
                    try {
                        checksumResultString = await Checksum.sha512(arg.filepath);
                    } catch (e) {
                        event.sender.send('checksum-result', {
                            checksumResult: checksumResultString,
                            error: true,
                            match: didMatch,
                        });
                    }

                    didMatch = checksumResultString === arg.checksum ? true : false;

                    if (arg.saveChecksum) {
                        clipboard.writeText(checksumResultString);
                    }

                    event.sender.send('checksum-result', {
                        checksumResult: checksumResultString,
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
                            error: true,
                            match: didMatch,
                        });
                    }
                    didMatch = checksumResultString === arg.checksum ? true : false;
                    if (arg.saveChecksum) {
                        clipboard.writeText(checksumResultString);
                    }

                    event.sender.send('checksum-result', {
                        checksumResult: checksumResultString,
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
                            error: true,
                            match: didMatch,
                        });
                    }

                    didMatch = checksumResultString === arg.checksum ? true : false;

                    if (arg.saveChecksum) {
                        clipboard.writeText(checksumResultString);
                    }

                    event.sender.send('checksum-result', {
                        checksumResult: checksumResultString,
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
                            error: true,
                            match: didMatch,
                        });
                    }
                    didMatch = checksumResultString === arg.checksum ? true : false;

                    if (arg.saveChecksum) {
                        clipboard.writeText(checksumResultString);
                    }

                    event.sender.send('checksum-result', {
                        checksumResult: checksumResultString,
                        error: false,
                        match: didMatch,
                    });
                    break;
                default:
                    break;
            }
        });
    }

    public initCheck() {
        this.mainWindow.webContents.send('check', {});
    }
}
