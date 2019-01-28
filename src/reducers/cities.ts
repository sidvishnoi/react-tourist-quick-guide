import { AnyAction } from 'redux';
import { WeatherProps } from '../components/Weather';
import initialState, { State } from '../state';

interface CityAction extends AnyAction {
  name: string;
}

interface AddCityAction extends CityAction {
  type: 'ADD_CITY';
}

interface RemoveCityAction extends CityAction {
  type: 'REMOVE_CITY';
}

interface MoveCityUpAction extends CityAction {
  type: 'MOVE_CITY_UP';
}

interface WeatherResponseAction extends CityAction {
  type: 'WEATHER_RESPONSE';
  response: WeatherProps;
}

interface PlacesResponseAction extends CityAction {
  type: 'PLACES_RESPONSE';
  response: { name: string; link: string }[];
}

interface DistanceResponseAction extends CityAction {
  type: 'DISTANCE_RESPONSE';
  response: number;
}

interface WeatherErrorAction extends CityAction {
  type: 'WEATHER_ERROR';
  response: WeatherProps;
}

interface PlacesErrorAction extends CityAction {
  type: 'PLACES_ERROR';
  response: { name: string; link: string }[];
}

interface DistanceErrorAction extends CityAction {
  type: 'DISTANCE_ERROR';
  response: number;
}

export type ActionType =
  | AddCityAction
  | RemoveCityAction
  | MoveCityUpAction
  | WeatherResponseAction
  | PlacesResponseAction
  | DistanceResponseAction
  | WeatherErrorAction
  | PlacesErrorAction
  | DistanceErrorAction;

export default function(
  state: State['cities'] = initialState.cities,
  action: ActionType,
) {
  switch (action.type) {
    case 'ADD_CITY': {
      const newCity = action.name;
      if (state.allIds.includes(newCity)) {
        return state;
      }
      const byId = { ...state.byId };
      byId[newCity] = {
        distance: { data: null, state: 'loading' },
        places: { data: null, state: 'loading' },
        weather: { data: null, state: 'loading' },
      };
      const allIds = [newCity, ...state.allIds];
      return { byId, allIds };
    }

    case 'REMOVE_CITY': {
      const idx = state.allIds.indexOf(action.name);
      if (idx === -1) {
        return state;
      }
      const allIds = [
        ...state.allIds.slice(0, idx),
        ...state.allIds.slice(idx + 1),
      ];
      return { ...state, allIds };
    }

    case 'MOVE_CITY_UP': {
      const idx = state.allIds.indexOf(action.name);
      if (idx <= 0) {
        return state;
      }
      const allIds = [...state.allIds];
      allIds.splice(idx, 1); // remove from list
      allIds.splice(idx - 1, 0, action.name); // insert one position before
      return { ...state, allIds };
    }

    case 'DISTANCE_RESPONSE':
    case 'PLACES_RESPONSE':
    case 'WEATHER_RESPONSE':
    case 'DISTANCE_ERROR':
    case 'PLACES_ERROR':
    case 'WEATHER_ERROR': {
      const { name } = action;
      const [prefix, suffix] = action.type.split('_', 2);
      const key = prefix.toLowerCase() as 'weather' | 'places' | 'distance';
      const newState = { ...state };
      newState.byId = { ...state.byId };
      newState.byId[name] = { ...newState.byId[name] };
      newState.byId[name][key] = {
        data: suffix === 'RESPONSE' ? (action.response as any) : null,
        state: suffix === 'RESPONSE' ? 'ready' : 'error',
      };
      return newState;
    }

    default:
      return state;
  }
}
