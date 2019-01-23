import { combineReducers } from 'redux';
import search from './search';
import cities from './cities';
import { WeatherProps } from '../components/Weather';

export interface SearchState {
  suggestions: { name: string; id: string }[];
  query: string;
  isLoading: boolean;
}

export interface State {
  search: {
    source: SearchState;
    destination: SearchState;
  };
  cities: {
    byId: {
      [id: string]: {
        name: string;
        distance: number;
        weather: WeatherProps;
        places: { name: string; link: string }[];
      };
    };
    allIds: string[];
  };
}

export default combineReducers<State>({
  search,
  cities,
});
