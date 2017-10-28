import { app, Menu } from 'electron';
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
];
