import { combineReducers } from 'redux';
import search from './search';

export interface State {
  search: {
    suggestions: { name: string; id: string }[];
    query: string;
    isLoading: boolean;
  };
}

export default combineReducers<State>({
  search,
});
