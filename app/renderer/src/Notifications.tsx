import * as React from 'react';
import { remote } from 'electron';

import { Button, notification } from 'antd';

import store from './store';
import { updateApp } from './actions/update/index';

import I18n from '../../lib/i18n/i18n';
const i18n: I18n = new I18n();

/**
 * Message to show when an update is NOT available
 * @param msg Message to show, the mesasge wich was sent from the main process update ipc
 */
export const showUpdateNotAvailableNotification = msg => {
  notification.open({
    message: 'Update Info',
    description: msg,
    placement: 'bottomRight',
    duration: 3.5,
  });
};

/**
 * Message to show when an update IS available
 * @param msg Message to show, the mesasge wich was sent from the main process update ipc
 */
export const showUpdateAvailableNotification = msg => {
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        store.dispatch(updateApp());
        notification.destroy();
      }}
    >
      {i18n.translate('update application')}
    </Button>
  );

  notification.open({
    btn,
    message: 'Update Info',
    description: msg,
    placement: 'bottomRight',
    duration: 0,
  });
};

/**
 * Message to show when the language option in the settings is changed
 */
export const showLanguageOptionsChangedNotification = () => {
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        remote.app.relaunch();
        remote.app.exit(0);
      }}
    >
      {i18n.translate('restart application')}
    </Button>
  );

  notification.close('notifciation:languageOptionsChanged');
  notification.open({
    btn,
    message: i18n.translate('language options changed'),
    description: i18n.translate('option changed restart app'),
    key: 'notifciation:languageOptionsChanged',
    duration: 0,
    placement: 'bottomRight',
  });
};
