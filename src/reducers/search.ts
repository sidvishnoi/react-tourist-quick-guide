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
  source: {
    query: '',
    suggestions: [] as APIResponse,
    isLoading: false,
  },
  destination: {
    query: '',
    suggestions: [] as APIResponse,
    isLoading: false,
  },
};

type SearchActions = LookupAction | ResponseAction | ResponseError | LookupNoop;

export default function searchSuggestions(
  state: State['search'] = intialState,
  action: SearchActions,
) {
  const { id } = action;
  switch (action.type) {
    case 'SUGGESTION_LOOKUP':
      return {
        ...state,
        [id]: {
          query: action.query,
          suggestions: [] as APIResponse,
          isLoading: true,
        },
      };
    case 'SUGGESTION_RESPONSE':
      // reject a delayed response from previous slow request
      // so it doesn't override expected response for current state
      if (state[id].query !== action.query) {
        return { ...state, [id]: { ...state[id], isLoading: false } };
      }
      return {
        ...state,
        [id]: {
          query: action.query,
          suggestions: action.locations,
          isLoading: false,
        },
      };
    case 'SUGGESTION_RESPONSE_ERROR':
      return {
        ...state,
        [id]: {
          isLoading: false,
          query: state[id].query,
          suggestions: [] as APIResponse,
        },
      };
    case 'SUGGESTION_UPDATE':
      return { ...state, [id]: { ...intialState[id], query: action.query } };
    default:
      return state;
  }
}
