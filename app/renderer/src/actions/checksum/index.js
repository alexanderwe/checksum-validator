import { ipcRenderer } from 'electron';

export const CHECKSUM_TYPE_CHANGED = 'CHECKSUM_TYPE_CHANGED';
export const CHECKSUM_RESULT = 'CHECKSUM_RESULT';

export const checksumTypeChanged = checksumType => {
  return {
    type: CHECKSUM_TYPE_CHANGED,
    checksumType: checksumType,
  };
};

ipcRenderer.on('checksum-result', (event, data) => {
  dispatch({
    type: CHECKSUM_RESULT,
    checksumResult: data.checksumResult,
    error: data.error,
    loading: false,
    match: data.match,
  });
});
