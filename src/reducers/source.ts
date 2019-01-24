import { AnyAction } from 'redux';
import initialState from '../state';

interface LocationSelectAction extends AnyAction {
  location: string;
}

type ActionType = LocationSelectAction;

export default (state: string = initialState.source, action: ActionType) => {
  if (action.type === 'LOCATION_SELECT' && !state) {
    return action.location;
  }
  return state;
};
