import { AnyAction } from 'redux';
import initialState, { State } from '../state';

interface LookupAction extends AnyAction {
  type: 'SUGGESTION_LOOKUP';
  query: string;
}

type APIResponse = {
  name: string;
  id: string;
}[];

interface ResponseAction extends AnyAction {
  type: 'SUGGESTION_RESPONSE';
  query: string;
  locations: APIResponse;
}

interface ResponseError extends AnyAction {
  type: 'SUGGESTION_RESPONSE_ERROR';
  error: string;
}

interface LookupNoop extends AnyAction {
  type: 'SUGGESTION_UPDATE';
  query: string;
}

export type SearchActions =
  | LookupAction
  | ResponseAction
  | ResponseError
  | LookupNoop;

export default function searchSuggestions(
  state: State['search'] = initialState.search,
  action: SearchActions,
) {
  switch (action.type) {
    case 'SUGGESTION_UPDATE':
      return { ...initialState.search, query: action.query };
    case 'SUGGESTION_LOOKUP':
      return {
        isLoading: true,
        query: action.query,
        suggestions: [] as APIResponse,
      };
    case 'SUGGESTION_RESPONSE':
      // reject a delayed response from previous slow request
      // so it doesn't override expected response for current state
      if (state.query !== action.query) {
        return { ...state, isLoading: false };
      }
      return {
        isLoading: false,
        query: action.query,
        suggestions: action.locations,
      };
    case 'SUGGESTION_RESPONSE_ERROR':
      return {
        isLoading: false,
        query: state.query,
        suggestions: [] as APIResponse,
      };
    default:
      return state;
  }
}
