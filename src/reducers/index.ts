import { combineReducers } from 'redux';
import search from './search';
import cities from './cities';
import { WeatherProps } from '../components/Weather';

export interface State {
  search: {
    suggestions: { name: string; id: string }[];
    query: string;
    isLoading: boolean;
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
