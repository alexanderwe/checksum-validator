import {
  CHECKSUM_CURRENTLY_CHECKING,
  CHECKSUM_TYPE_CHANGED,
  CHECKSUM_RESULT,
} from '../actions/checksum';

const initialState = {
  currentChecksum: null,
  checksumResult: null,
  error: false,
  loading: false,
  match: false,
  type: 'SHA256',
};

export function checksum(state = initialState, action) {
  switch (action.type) {
    case CHECKSUM_CURRENTLY_CHECKING:
      return Object.assign({}, state, {
        loading: action.data.loading || {},
      });
    case CHECKSUM_TYPE_CHANGED:
      return Object.assign({}, state, {
        type: action.data.checksumType || {},
      });
    case CHECKSUM_RESULT:
      console.log(action.data);
      return Object.assign({}, state, {
        checksumResult: action.data.checksumResult || null,
        currentChecksum: action.data.currentChecksum || null,
        error: action.data.error || false,
        loading: action.data.loading || false,
        match: action.data.match || false,
      });
    default:
      return state;
  }
}
