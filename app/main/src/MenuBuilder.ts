
import { app, Menu, shell } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as username from 'username';
import AppUpdater from './AppUpdater';
import I18n from './i18n/i18n';
import IPCHandler from './IPCHandler';

export default class MenuBuilder {

    private updater: AppUpdater;

    constructor(updater: AppUpdater) {
        this.updater = updater;
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
                    { role: 'about', label: I18n.translate('about') },
                    {
                        click: () => {
                            this.updater.checkForUpdate();
                        },
                        label: I18n.translate('check for updates'),
                    },
                    { role: 'hide', label: I18n.translate('hide') },
                    { role: 'hideothers', label: I18n.translate('hide others') },
                    { role: 'unhide', label: I18n.translate('unhide') },
                    { type: 'separator' },
                    { role: 'quit', label: I18n.translate('quit') },
                ],
            },
            {
                label: I18n.translate('edit'),
                submenu: [
                    { type: 'separator' },
                    { role: 'cut', label: I18n.translate('cut') },
                    { role: 'copy', label: I18n.translate('copy') },
                    { role: 'paste', label: I18n.translate('paste') },
                ],
            },
            {
                label: I18n.translate('help'), role: 'help',
                submenu: [
                    {
                        click: () => {
                            shell.openExternal('https://github.com/alexanderwe/checksum-validator');
                        },
                        label: I18n.translate('learn more'),
                    },
                    {
                        click: () => {
                            shell.openItem(path.join('/Users/', username.sync(), '/Library/logs/checksum-validator/log.log'));
                        },
                        label: I18n.translate('open logs'),
                    },
                ],
            },
        ];
    }
}