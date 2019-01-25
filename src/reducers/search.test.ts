import { State } from '../state';
import reducer, { SearchActions } from './search';

describe('Reducers - search', () => {
  const inputState: State['search'] = {
    isLoading: false,
    query: '',
    suggestions: [],
  };

  describe('defaults', () => {
    const action = ({ type: 'ANY' } as unknown) as SearchActions;
    it('returns initialState', () => {
      expect(reducer(undefined, action)).toEqual(inputState);
    });
  });

  describe('SUGGESTION_LOOKUP', () => {
    const action: SearchActions = { type: 'SUGGESTION_LOOKUP', query: 'PASS' };

    it('updates state with new query', () => {
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual({
        isLoading: true,
        query: 'PASS',
        suggestions: [],
      });
    });
  });

  describe('SUGGESTION_RESPONSE', () => {
    const action: SearchActions = {
      locations: [{ name: 'FOO', id: 'foo' }],
      query: 'PASS',
      type: 'SUGGESTION_RESPONSE',
    };

    it('updates state with new query', () => {
      const outputState = reducer({ ...inputState, query: 'PASS' }, action);
      expect(outputState).toEqual({
        isLoading: false,
        query: action.query,
        suggestions: action.locations,
      });
    });

    it('prevents a slow response from old request to override new response', () => {
      const outputState = reducer(
        { ...inputState, query: 'BAR' },
        { ...action, query: 'FOO' },
      );
      expect(outputState).toEqual({
        ...inputState,
        isLoading: false,
        query: 'BAR',
      });
    });
  });

  describe('SUGGESTION_RESPONSE_ERROR', () => {
    const action: SearchActions = {
      error: 'error',
      type: 'SUGGESTION_RESPONSE_ERROR',
    };

    it('clears suggestions and sets isLoading to false', () => {
      const input = {
        isLoading: true,
        query: 'PASS',
        suggestions: [{ name: 'foo', id: 'foo' }],
      };
      const outputState = reducer(input, action);
      expect(outputState).toEqual({
        isLoading: false,
        query: 'PASS',
        suggestions: [],
      });
    });
  });

  describe('SUGGESTION_UPDATE', () => {
    const action: SearchActions = {
      query: 'BAR',
      type: 'SUGGESTION_UPDATE',
    };
    it('updates state.query', () => {
      expect(reducer(inputState, action)).toEqual({
        ...inputState,
        query: 'BAR',
      });
    });
  });
});
