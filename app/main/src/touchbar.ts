import { TouchBar } from 'electron';
const { TouchBarButton } = TouchBar;

const check: Electron.TouchBarConstructorOptions = {
    items: [new TouchBarButton({
        backgroundColor: '#00c4a7',
        click: () => {
            console.log('Check');
        },
        label: 'Check',
    })],
};

export const touchBar = new TouchBar(check);
