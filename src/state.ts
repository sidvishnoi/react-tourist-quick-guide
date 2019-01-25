import { WeatherProps } from './components/Weather';

const initialState: State = {
  cities: [],
  distance: {},
  places: {},
  search: {
    isLoading: false,
    query: '',
    suggestions: [],
  },
  source: '',
  weather: {},
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
  cities: string[];
  weather: {
    [name: string]: {
      state: string;
      data: WeatherProps;
    };
  };
  distance: {
    [name: string]: {
      state: string;
      data: number;
    };
  };
  places: {
    [name: string]: {
      state: string;
      data: { name: string; link: string }[];
    };
  };
}
