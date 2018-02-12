export enum Events {
  UPDATE = 'update',
  UPDATE_CHECK = 'update:check',
  UPDATE_DOWNLOADING = 'update:downloading',
  UPDATE_DOWNLOADED = 'update:downloaded',
  CHECKSUM = 'checksum',
  CHECKSUM_RESULT = 'checksum:result',
  DATABASE_CHECKS_RELOAD = 'database:checks-reload',
  DATABASE_CHECK_DELETE = 'database:check-delete',
  SETTINGS_LOAD = 'settings:load',
  SETTINGS_UPDATED = 'settings:update',
}
