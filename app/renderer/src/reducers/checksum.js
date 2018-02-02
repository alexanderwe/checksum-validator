import { CHECKSUM_TYPE_CHANGED, CHECKSUM_RESULT } from '../actions/checksum/';

const initialState = {
  checksum: '',
  checksumResult: '',
  error: false,
  fileHover: false,
  fileName: '',
  filePath: '',
  loading: false,
  match: false,
  notificationOpen: false,
  saveChecksum: false,
  type: 'SHA256',
};

export function checksum(state = initialState, action) {
  const { checksumType, type } = action;

  switch (type) {
    case CHECKSUM_TYPE_CHANGED:
      return Object.assign({}, state, {
        type: checksumType || {},
      });
    default:
      return state;
  }
}
