import * as electron from 'electron';
import * as fs from 'fs';
import * as path from 'path';

interface ILanguages {
    [key: string]: string;
}

class I18n {

    private loadedLanguage: ILanguages;
    private app = electron.app ? electron.app : electron.remote.app;




    constructor() {
        if (fs.existsSync(path.join(__dirname, this.app.getLocale() + '.json'))) {
            this.loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, this.app.getLocale() + '.json'), 'utf8'));
        } else {
            this.loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, 'en.json'), 'utf8'));
        }
    }

    public translate(phrase: string): string {
        let translation = this.loadedLanguage[phrase];
        if (translation === undefined) {
            translation = phrase;
        }
        return translation;
    }
}

export default new I18n();
