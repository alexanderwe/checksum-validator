import * as child from 'child_process';
import * as crypto from 'crypto';
import * as fs from 'fs';
import electronLog from 'electron-log';
import { IChecksum, ChecksumAlgorithm } from './Database';
export default class Checksum {

  public static fileHash(filename, algorithm = 'md5'): Promise<string> {
    return new Promise((resolve, reject) => {

      if (!filename) {
        reject(new Error());
      }

      let shasum = crypto.createHash(algorithm);
      try {
        let s = new fs.ReadStream(filename)
        s.on('data', function (data) {
          shasum.update(data)
        })
        // making digest
        s.on('end', function () {
          const hash = shasum.digest('hex');
          electronLog.info(
            `Computed ${algorithm} of ${filename} result: ${hash}`,
          );
          return resolve(hash);
        })
      } catch (error) {
        electronLog.error(
          `Error while computing ${algorithm} of ${filename} : ${error}`,
        );
        return reject('calc fail');
      }
    });
  }



  /**
   * @function sha512
   * @param  {string} filepath: path to the file
   * @desc Computes sha512 hash of the given file using shasum
   * @return {Promise.string} The calculation result
   */
  public static sha512(filepath: string): Promise<string> {
    return Checksum.fileHash(filepath, 'sha512');
  }

  /**
   * @function sha256
   * @param  {string} filepath: path to the file
   * @desc  Computes sha256 hash of the given file using shasum
   * @return {Promise.string} The calculation result
   */
  public static sha256(filepath: string): Promise<string> {
    return Checksum.fileHash(filepath, 'sha256');
  }

  /**
   * @function sha1
   * @param  {string} filepath: path to the file
   * @desc Computes sha1 hash of the given file using openssl
   * @return {Promise.string} The calculation result
   */
  public static sha1(filepath: string): Promise<string> {
    return Checksum.fileHash(filepath, 'sha1');
  }

  /**
   * @function md5
   * @param  {string} filepath: path to the file
   * @desc Computes md5 hash of the given file using openssl
   * @return {Promise.string} The calculation result
   */
  public static md5(filepath: string): Promise<string> {
    return Checksum.fileHash(filepath, 'md5');
  }

  public static allChecksums(filepath: string): Promise<IChecksum[]> {
    return new Promise<IChecksum[]>(async (resolve, reject) => {
      const md5: IChecksum = {
        checksum: await Checksum.md5(filepath),
        algorithm: ChecksumAlgorithm.MD5,
      };

      const sha1: IChecksum = {
        checksum: await Checksum.sha1(filepath),
        algorithm: ChecksumAlgorithm.SHA1,
      };

      const sha256: IChecksum = {
        checksum: await Checksum.sha256(filepath),
        algorithm: ChecksumAlgorithm.SHA256,
      };

      const sha512: IChecksum = {
        checksum: await Checksum.sha512(filepath),
        algorithm: ChecksumAlgorithm.SHA512,
      };

      resolve([md5, sha1, sha256, sha512]);
    });
  }
}
