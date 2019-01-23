import { State } from '.';

interface Action {
  id: 'source' | 'destination';
}

interface LookupAction extends Action {
  type: 'SUGGESTION_LOOKUP';
  query: string;
}

type APIResponse = {
  name: string;
  id: string;
}[];

interface ResponseAction extends Action {
  type: 'SUGGESTION_RESPONSE';
  query: string;
  locations: APIResponse;
}

interface ResponseError extends Action {
  type: 'SUGGESTION_RESPONSE_ERROR';
  error: string;
}

interface LookupNoop extends Action {
  type: 'SUGGESTION_UPDATE';
  query: string;
}

const intialState: State['search'] = {
  query: '',
  suggestions: [] as APIResponse,
  isLoading: false,
};

type SearchActions = LookupAction | ResponseAction | ResponseError | LookupNoop;

export default function searchSuggestions(
  state: State['search'] = intialState,
  action: SearchActions,
) {
  switch (action.type) {
    case 'SUGGESTION_LOOKUP':
      return {
        query: action.query,
        suggestions: [] as APIResponse,
        isLoading: true,
      };
    case 'SUGGESTION_RESPONSE':
      // reject a delayed response from previous slow request
      // so it doesn't override expected response for current state
      if (state.query !== action.query) {
        return { ...state, isLoading: false };
      }
      return {
        query: action.query,
        suggestions: action.locations,
        isLoading: false,
      };
    case 'SUGGESTION_RESPONSE_ERROR':
      return {
        isLoading: false,
        query: state.query,
        suggestions: [] as APIResponse,
      };
    case 'SUGGESTION_UPDATE':
      return { ...intialState, query: action.query };
    default:
      return state;
  }
}
