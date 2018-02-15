import * as Datastore from 'nedb';
import * as path from 'path';
import IPCHandler from './IPCHandler';
import { Events } from '../../lib/Events';
import electronLog from 'electron-log';
import { app } from 'electron';

export interface ICheck {
  checksums: IChecksum[];
  filePath: String;
  checkString: String;
  checkAlgorithm: ChecksumAlgorithm;
  didMatch: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IChecksum {
  checksum: String;
  algorithm: ChecksumAlgorithm;
}

export enum ChecksumAlgorithm {
  MD5 = 'MD5',
  SHA1 = 'SHA1',
  SHA256 = 'SHA256',
  SHA512 = 'SHA512',
}

/**
 * @class Database
 * @desc  Handles the communication with the database
 */
class Database {
  checksCollection: Datastore;
  ipcHandler: IPCHandler;

  constructor(ipcHandler: IPCHandler) {
    this.ipcHandler = ipcHandler;
    this.checksCollection = new Datastore({
      filename: path.join(app.getPath('userData'), 'checks.json'),
      autoload: true,
      timestampData: true,
    });
  }

  /**
   * Sends a refresh event to the renderer
   * @function refreshDB
   */
  public refreshDB() {
    this.checksCollection.find({}, (err, docs) => {
      this.ipcHandler.sendToRenderer(Events.DATABASE_CHECKS_RELOAD, docs);
    });
  }

  /**
   * Adds a check object to the database
   * @function addCheck()
   * @param check The object to add
   */
  public addCheck(check: ICheck) {
    this.checksCollection.insert(check, (err, newDoc) => {
      this.refreshDB();
    });
  }

  /**
   * Returns a single check with specified id
   * @function getCheck
   * @param  {string} id: Id of the check to get
   * @return {Promise.object} If resolved the found check
   */
  public getCheck(id: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.checksCollection.findOne({ _id: id }, (err, doc) => {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      });
    });
  }

  public deleteCheck(id: string) {
    this.checksCollection.remove({ _id: id }, {}, (err, numRemoved) => {
      electronLog.info(`Deleted check ${id}`);
      this.refreshDB();
    });
  }
}

export default Database;
