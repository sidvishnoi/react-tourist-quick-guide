import { combineReducers } from 'redux';

import { WeatherProps } from '../components/Weather';
import initialState, { State } from '../state';
import cities from './cities';
import createReducer from './createReducer';
import search from './search';
import source from './source';

const distance = createReducer<State['distance'], number>(
  'DISTANCE',
  initialState.distance,
);

interface PlacesResponse {
  name: string;
  link: string;
}

const places = createReducer<
  State['places'],
  PlacesResponse[]
>('PLACES', initialState.places);

const weather = createReducer<State['weather'], WeatherProps>(
  'WEATHER',
  initialState.weather,
);

export default combineReducers<State>({
  cities,
  distance,
  places,
  search,
  source,
  weather,
});
