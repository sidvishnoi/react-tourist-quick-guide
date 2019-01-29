import initialState from '../state';
import reducer, { ActionType } from './source';

describe('Reducers - source', () => {
  describe('defaults', () => {
    const action = ({ type: 'ANY' } as unknown) as ActionType;
    it('returns initialState', () => {
      expect(reducer(undefined, action)).toEqual(initialState.source);
    });
  });

  describe('LOCATION_SELECT', () => {
    const action: ActionType = { type: 'LOCATION_SELECT', location: 'PASS' };

    it('sets state.source if not set', () => {
      expect(reducer('', action)).toEqual('PASS');
    });

    it("doesn't over write state.source if already set", () => {
      expect(reducer('FOO', action)).toEqual('FOO');
    });
  });
});
