import { WeatherProps } from './components/Weather';

const initialStateWeather: State['weather'] = {
  'City One': {
    data: {
      forecast: [
        {
          icon: 'sun',
          summary: 'sunny',
          temperature: 38,
        },
        {
          icon: 'rain',
          summary: 'shower',
          temperature: 34,
        },
        {
          icon: 'sun',
          summary: 'sunny',
          temperature: 39,
        },
      ],
      icon: 'sun',
      summary: 'sunny',
      temperature: 40,
      unit: 'C',
    },
    state: 'ready',
  },
  'City With Long name': {
    data: {
      forecast: [
        {
          icon: 'rain',
          summary: 'rain',
          temperature: 31,
        },
        {
          icon: 'rain',
          summary: 'shower',
          temperature: 29,
        },
        {
          icon: 'sun',
          summary: 'sunny',
          temperature: 35,
        },
      ],
      icon: 'sun',
      summary: 'sunny',
      temperature: 36,
      unit: 'C',
    },
    state: 'ready',
  },
  'Third City': {
    data: {
      forecast: [
        {
          icon: 'sun',
          summary: 'sunny',
          temperature: 38,
        },
        {
          icon: 'rain',
          summary: 'shower',
          temperature: 34,
        },
        {
          icon: 'sun',
          summary: 'sunny',
          temperature: 39,
        },
      ],
      icon: 'sun',
      summary: 'sunny',
      temperature: 30,
      unit: 'C',
    },
    state: 'ready',
  },
  'Wow Fourth City': {
    data: null,
    state: 'loading',
  },
};

const initialStateDistance: State['distance'] = {
  'City One': {
    data: 45,
    state: 'ready',
  },
  'City With Long name': {
    data: 24,
    state: 'ready',
  },
  'Third City': {
    data: 500,
    state: 'ready',
  },
};

const initialStatePlaces = {
  'City One': {
    data: [
      { name: 'Place one', link: '#' },
      { name: 'Place two', link: '#' },
      { name: 'Place third', link: '#' },
      { name: 'Place fourth is long', link: '#' },
      { name: 'Place five', link: '#' },
    ],
    state: 'ready',
  },
  'City With Long name': {
    data: [
      { name: 'Place one', link: '#' },
      { name: 'Place two', link: '#' },
      { name: 'Place third', link: '#' },
      { name: 'Place fourth is long', link: '#' },
      { name: 'Place five', link: '#' },
    ],
    state: 'ready',
  },
  'Third City': {
    data: [
      { name: 'Place one', link: '#' },
      { name: 'Place two', link: '#' },
      { name: 'Place third', link: '#' },
      { name: 'Place fourth is long', link: '#' },
      { name: 'Place five', link: '#' },
    ],
    state: 'ready',
  },
};

const initialState: State = {
  cities: ['City One', 'City With Long name'],
  distance: initialStateDistance,
  places: initialStatePlaces,
  search: {
    isLoading: false,
    query: '',
    suggestions: [],
  },
  source: 'New Delhi',
  weather: initialStateWeather,
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
