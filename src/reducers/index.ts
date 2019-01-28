import { combineReducers } from 'redux';

import { State } from '../state';
import cities from './cities';
import search from './search';
import source from './source';

export default combineReducers<State>({
  cities,
  search,
  source,
});
