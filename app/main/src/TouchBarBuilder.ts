import { TouchBar } from 'electron';
import IPCHandler from './IPCHandler';
import AppUpdater from './AppUpdater';
import I18n from '../../lib/i18n/I18n';

const { TouchBarButton } = TouchBar;

export default class TouchBarBuilder {
  private ipcHandler: IPCHandler;
  private appUpdater: AppUpdater;
  private i18n: I18n;

  constructor(ipcHandler: IPCHandler, appUpdater: AppUpdater) {
    this.ipcHandler = ipcHandler;
    this.appUpdater = appUpdater;
    this.i18n = new I18n();
  }

  public build(): TouchBar {
    const check: Electron.TouchBarConstructorOptions = {
      items: [
        new TouchBarButton({
          backgroundColor: '#8b4d93',
          click: () => {
            this.appUpdater.checkForUpdate();
          },
          label: this.i18n.translate('check for updates'),
        }),
      ],
    };
    return new TouchBar(check);
  }
}
