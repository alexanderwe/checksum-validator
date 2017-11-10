import * as child from 'child_process';
import electronLog from 'electron-log';

export default class Checksum {

  /**
   * @function sha512
   * @param  {string} filepath: path to the file 
   * @desc Computes sha512 hash of the given file using shasum
   * @return {Promise.string} The calculation result
   */
  public static sha512(filepath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      child.exec('shasum -a 512 ' + filepath.replace(/ /g, '\\ '), (error, stdout, stderr) => {
        const checksum = stdout.split(' ')[0].trim();
        if (error) {
          electronLog.error('Error while computing SHA512 of ' + filepath + ' : ' + error);
          reject(error);
        }
        electronLog.info('Computed SHA512 of ' + filepath + ' result: ' + checksum);
        resolve(checksum);
      });
    });
  }

  /**
   * @function sha256
   * @param  {string} filepath: path to the file 
   * @desc  Computes sha256 hash of the given file using shasum
   * @return {Promise.string} The calculation result
   */
  public static sha256(filepath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      child.exec('shasum -a 256 ' + filepath.replace(/ /g, '\\ '), (error, stdout, stderr) => {
        const checksum = stdout.split(' ')[0].trim();
        if (error) {
          electronLog.error('Error while computing sha256 of ' + filepath + ' : ' + error);
          reject(error);
        }
        electronLog.info('Computed sha256 of ' + filepath + ' result: ' + checksum);
        resolve(checksum);
      });
    });
  }

  /**
   * @function sha1
   * @param  {string} filepath: path to the file 
   * @desc Computes sha1 hash of the given file using openssl
   * @return {Promise.string} The calculation result
   */
  public static sha1(filepath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      child.exec('openssl sha1 ' + filepath.replace(/ /g, '\\ '), (error, stdout, stderr) => {
        const checksum = stdout.split(' ')[0].trim();
        if (error) {
          electronLog.error('Error while computing sha1 of ' + filepath + ' : ' + error);
          reject(error);
        }
        electronLog.info('Computed sha1 of ' + filepath + ' result: ' + checksum);
        resolve(checksum);
      });
    });
  }

  /**
   * @function md5
   * @param  {string} filepath: path to the file 
   * @desc Computes md5 hash of the given file using openssl
   * @return {Promise.string} The calculation result
   */
  public static md5(filepath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      child.exec('openssl md5 ' + filepath.replace(/ /g, '\\ '), (error, stdout, stderr) => {
        const checksum = stdout.split(' ')[0].trim();
        if (error) {
          electronLog.error('Error while computing md5 of ' + filepath + ' : ' + error);
          reject(error);
        }
        electronLog.info('Computed md5 of ' + filepath + ' result: ' + checksum);
        resolve(checksum);
      });
    });
  }
}
