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
                backgroundColor: '#8b4d93',
                click: () => {
                    this.ipcHandler.sendToRenderer('check', {});
                },
                label: 'Check',
            })] as any, // as any till https://github.com/electron/electron/issues/10916 gets resolved
        };
        return new TouchBar(check);
    }

}
