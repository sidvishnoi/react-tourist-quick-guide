import { State } from '.';

type LookupAction = {
  type: 'SUGGESTION_LOOKUP';
  query: string;
};

type APIResponse = {
  name: string;
  id: string;
}[];

type ResponseAction = {
  type: 'SUGGESTION_RESPONSE';
  query: string;
  locations: APIResponse;
};

type ResponseError = {
  type: 'SUGGESTION_RESPONSE_ERROR';
  error: string;
};

type LookupNoop = {
  type: 'SUGGESTION_NOOP';
  query: string;
};

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
    case 'SUGGESTION_NOOP':
      return { ...intialState, query: action.query };
    default:
      return state;
  }
}