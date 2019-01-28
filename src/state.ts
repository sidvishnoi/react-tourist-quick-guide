import { PlacesProps } from './components/Places';
import { WeatherProps } from './components/Weather';

const initialState: State = {
  cities: {
    allIds: [],
    byId: {},
  },
  search: {
    isLoading: false,
    query: '',
    suggestions: [],
  },
  source: '',
};

export default initialState;

export interface SearchState {
  isLoading: boolean;
  query: string;
  suggestions: { name: string; id: string }[];
}

export interface State {
  search: SearchState;
  source: string;
  cities: {
    allIds: string[];
    byId: {
      [cityName: string]: {
        weather: {
          state: string;
          data: WeatherProps;
        };
        distance: {
          state: string;
          data: number;
        };
        places: {
          state: string;
          data: PlacesProps['places'];
        };
      };
    };
  };
}
