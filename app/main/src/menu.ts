import { app, Menu } from 'electron';
import AppUpdater from './AppUpdater';

export const menuTemplate: Electron.MenuItemConstructorOptions[] = [
    {
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
        ],
    },
    {
        role: 'help',
        submenu: [
            {
                click: () => {
                    console.log("update");
                },
                label: 'Update',
            },
        ],
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
        ],
    },
];
