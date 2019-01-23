import { AnyAction } from 'redux';

const initialState = '';

export default (state = initialState, action: AnyAction) => {
  if (action.type === 'LOCATION_SELECT' && !state) {
    return action.location;
  }
  return state;
};
