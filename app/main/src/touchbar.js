import { TouchBar } from 'electron';
const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar;

const check = new TouchBarButton({
    label: 'Check',
    backgroundColor: '#00c4a7',
    click: () => {
        console.log('Check');
    }
});

export const touchBar = new TouchBar([check]);
