import { AnyAction } from 'redux';
import initialState, { State } from '../state';

interface AddCityAction extends AnyAction {
  name: string;
}

interface RemoveCityAction extends AnyAction {
  name: string;
}

type ActionType = AddCityAction | RemoveCityAction;

export default function cities(
  state: State['cities'] = initialState.cities,
  action: ActionType,
) {
  switch (action.type) {
    case 'ADD_CITY':
      return [...state, action.name];
    case 'REMOVE_CITY': {
      const idx = state.indexOf(action.name);
      if (idx === -1) {
        return state;
      }
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    }
    default:
      return state;
  }
}
