import { combineReducers } from 'redux';
import search from './search';

export interface State {
  search: {
    suggestions: string[];
    term: string;
    isLoading: boolean;
    isInvalid: boolean;
  };
}

export default combineReducers<State>({
  search,
});
