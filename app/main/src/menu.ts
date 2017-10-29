
import { app, Menu, shell } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as username from 'username';
import AppUpdater from './AppUpdater';

let updater: AppUpdater;
updater = new AppUpdater();

export const menuTemplate: Electron.MenuItemConstructorOptions[] = [
    {
        label: app.getName(),
        submenu: [
            { role: 'about' },
            {
                click: () => {
                    updater.update();
                },
                label: 'Check for Updates...',
            },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
        ],
    },
    {
        label: 'Edit',
        submenu: [
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
        ],
    },
    {
        role: 'help',
        submenu: [
            {
                click: () => {
                    shell.openExternal('https://github.com/alexanderwe/checksum-validator');
                },
                label: 'Learn More',
            },
            {
                click: () => {
                    shell.openItem(path.join('/Users/', username.sync(), '/Library/logs/checksum-validator/log.log'));
                },
                label: 'Open Logs',
            },
        ],
    },
];
