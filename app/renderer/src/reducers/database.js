import { DATABASE_CHECKS_RELOAD } from '../actions/database';

const initialState = {
  checks: [],
};

export function database(state = initialState, action) {
  switch (action.type) {
    case DATABASE_CHECKS_RELOAD:
      return Object.assign({}, state, {
        checks: action.data.checks || [],
      });
    default:
      return state;
  }
}
