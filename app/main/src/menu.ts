import { app, Menu } from 'electron';

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
];
