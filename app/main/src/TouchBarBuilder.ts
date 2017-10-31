import { TouchBar } from 'electron';
import IPCHandler from './IPCHandler';

const { TouchBarButton } = TouchBar;

export default class TouchBarBuilder {

    private ipcHandler: IPCHandler;

    constructor(ipcHandler: IPCHandler) {
        this.ipcHandler = ipcHandler;
    }

    public build(): TouchBar {
        const check: Electron.TouchBarConstructorOptions = {
            items: [new TouchBarButton({
                backgroundColor: '#00c4a7',
                click: () => {
                    this.ipcHandler.initCheck();
                },
                label: 'Check',
            })],
        };
        return new TouchBar(check);
    }

}
