import { State } from '.';

type LookupAction = {
  type: 'SUGGESTION_LOOKUP';
  term: string;
};

type ResponseAction = {
  type: 'SUGGESTION_RESPONSE';
  term: string;
  terms: string[];
};

type ResponseError = {
  type: 'SUGGESTION_RESPONSE_ERROR';
  error: string;
};

type LookupNoop = {
  type: 'SUGGESTION_NOOP';
};

const intialState: State['search'] = {
  term: '',
  suggestions: [] as string[],
  isLoading: false,
  isInvalid: false,
};

type SearchActions = LookupAction | ResponseAction | ResponseError | LookupNoop;

export default function searchSuggestions(
  state: State['search'] = intialState,
  action: SearchActions,
) {
  switch (action.type) {
    case 'SUGGESTION_LOOKUP':
      return {
        term: action.term,
        suggestions: [] as string[],
        isLoading: true,
        isInvalid: false,
      };
    case 'SUGGESTION_RESPONSE':
      // reject a delayed response from previous slow request
      // so it doesn't override expected response for current state
      if (state.term !== action.term) {
        return { ...state, isLoading: false };
      }
      return {
        term: action.term,
        suggestions: action.terms,
        isLoading: false,
        isInvalid: action.term.length && !action.terms.length,
      };
    case 'SUGGESTION_RESPONSE_ERROR':
      return {
        isLoading: false,
        term: state.term,
        suggestions: [] as string[],
        isInvalid: true,
      };
    case 'SUGGESTION_NOOP':
      return { ...intialState };
    default:
      return state;
  }
}
