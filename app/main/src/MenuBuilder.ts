
import { app, Menu, shell } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as username from 'username';
import I18n from '../../lib/i18n/I18n';
import AppUpdater from './AppUpdater';
import IPCHandler from './IPCHandler';

export default class MenuBuilder {

    private i18n: I18n;
    private updater: AppUpdater;

    constructor(updater: AppUpdater) {
        this.updater = updater;
        this.i18n = new I18n();
    }

    /**
     * @function build
     * @description Build the Electron menu
     * @return {Electron.MenuItemConstructorOptions[]} returns an array containing the menu items
     */
    public build(): Electron.MenuItemConstructorOptions[] {
        return [
            {
                label: app.getName(),
                submenu: [
                    { role: 'about', label: this.i18n.translate('about') },
                    {
                        click: () => {
                            this.updater.checkForUpdate();
                        },
                        label: this.i18n.translate('check for updates'),
                    },
                    { role: 'hide', label: this.i18n.translate('hide') },
                    { role: 'hideothers', label: this.i18n.translate('hide others') },
                    { role: 'unhide', label: this.i18n.translate('unhide') },
                    { type: 'separator' },
                    { role: 'quit', label: this.i18n.translate('quit') },
                ],
            },
            {
                label: this.i18n.translate('edit'),
                submenu: [
                    { type: 'separator' },
                    { role: 'cut', label: this.i18n.translate('cut') },
                    { role: 'copy', label: this.i18n.translate('copy') },
                    { role: 'paste', label: this.i18n.translate('paste') },
                ],
            },
            {
                label: this.i18n.translate('help'), role: 'help',
                submenu: [
                    {
                        click: () => {
                            shell.openExternal('https://github.com/alexanderwe/checksum-validator');
                        },
                        label: this.i18n.translate('learn more'),
                    },
                    {
                        click: () => {
                            shell.openItem(path.join('/Users/', username.sync(), '/Library/logs/checksum-validator/log.log'));
                        },
                        label: this.i18n.translate('open logs'),
                    },
                ],
            },
        ];
    }
}
