import { clipboard, ipcMain } from 'electron';
import Checksum from './Checksum';

/**
 * @class IPCHandler
 * @desc  Handles all the IPC calls in the main process
 */
export default class IPCHandler {
    constructor() {
        ipcMain.on('checksum', async (event: any, arg: any) => {

            let checksumResultString: string;
            let didMatch: boolean;

            switch (arg.type) {
                case 'SHA512':
                    checksumResultString = await Checksum.sha512(arg.filepath);
                    didMatch = checksumResultString === arg.checksum ? true : false;

                    if (arg.saveChecksum) {
                        clipboard.writeText(checksumResultString);
                    }

                    event.sender.send('checksum-result', {
                        checksumResult: checksumResultString,
                        match: didMatch,
                    });
                    break;
                case 'SHA256':
                    checksumResultString = await Checksum.sha256(arg.filepath);
                    didMatch = checksumResultString === arg.checksum ? true : false;
                    if (arg.saveChecksum) {
                        clipboard.writeText(checksumResultString);
                    }

                    event.sender.send('checksum-result', {
                        checksumResult: checksumResultString,
                        match: didMatch,
                    });

                    break;
                case 'SHA1':
                    checksumResultString = await Checksum.sha1(arg.filepath);
                    didMatch = checksumResultString === arg.checksum ? true : false;

                    if (arg.saveChecksum) {
                        clipboard.writeText(checksumResultString);
                    }

                    event.sender.send('checksum-result', {
                        checksumResult: checksumResultString,
                        match: didMatch,
                    });
                    break;
                case 'MD5':
                    checksumResultString = await Checksum.md5(arg.filepath);
                    didMatch = checksumResultString === arg.checksum ? true : false;

                    if (arg.saveChecksum) {
                        clipboard.writeText(checksumResultString);
                    }

                    event.sender.send('checksum-result', {
                        checksumResult: checksumResultString,
                        match: didMatch,
                    });
                    break;
                default:
                    break;
            }
        });
    }
}
