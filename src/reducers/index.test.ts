import reducer from '.';
import initialState from '../state';

describe('Reducers - root reducer', () => {
  it('works', () => {
    expect(reducer(initialState, { type: 'ANY' })).toEqual(initialState);
  });
});
