import * as electron from 'electron';
import log from 'electron-log';
import * as fs from 'fs';
import * as isRenderer from 'is-electron-renderer';
import * as path from 'path';
import * as Store from 'electron-store';

interface ILanguages {
  [key: string]: string;
}

class I18n {
  private loadedLanguage: ILanguages;
  private settings: Store;
  private app = electron.app ? electron.app : electron.remote.app;
  private language: String;

  constructor() {
    this.settings = new Store();
    this.language = this.settings.get('language')
      ? this.settings.get('language')
      : this.app.getLocale();

    if (isRenderer) {
      // we are invoking the i18n from the renderer and need another path
      if (
        fs.existsSync(
          path.join(__dirname, '../build/' + this.language + '.json'),
        )
      ) {
        this.loadedLanguage = JSON.parse(
          fs.readFileSync(
            path.join(__dirname, '../build/' + this.language + '.json'),
            'utf8',
          ),
        );
      } else {
        this.loadedLanguage = JSON.parse(
          fs.readFileSync(
            path.join(__dirname, '../build/' + 'en.json'),
            'utf8',
          ),
        );
      }
    } else {
      if (fs.existsSync(path.join(__dirname, '/' + this.language + '.json'))) {
        this.loadedLanguage = JSON.parse(
          fs.readFileSync(
            path.join(__dirname, '/' + this.language + '.json'),
            'utf8',
          ),
        );
      } else {
        this.loadedLanguage = JSON.parse(
          fs.readFileSync(path.join(__dirname, 'en.json'), 'utf8'),
        );
      }
    }
  }

  public translate(phrase: string): string {
    let translation = this.loadedLanguage[phrase];
    if (translation === undefined) {
      translation = phrase;
    }
    return translation;
  }

  public translateTest(phrase: string): string {
    const tokens = phrase.split('.');
    const parent = this.loadedLanguage[tokens[0]];
    let translation = parent[tokens[1]];
    if (translation === undefined) {
      translation = phrase;
    }
    return translation;
  }
}

export default I18n;
