import createReducer from './createReducer';

describe('Reducers - createReducer', () => {
  interface State {
    [name: string]: {
      data: string;
      state: string;
    };
  }
  const inputState: State = {
    foo: {
      data: 'foo',
      state: 'ready',
    },
  };
  const reducer = createReducer<State, string>('PREFIX', inputState);

  it('returns a reducer', () => {
    expect(typeof reducer).toEqual('function');
    expect(reducer(undefined, { type: 'ANY' } as any)).toEqual(inputState);
  });

  describe('_SEARCH', () => {
    const action = { type: 'PREFIX_SEARCH', name: 'foo' } as any;
    expect(reducer({}, action)).toEqual({
      foo: {
        data: null,
        state: 'loading',
      },
    });
  });

  describe('_RESPONSE', () => {
    const action = {
      name: 'foo',
      response: 'BAR',
      type: 'PREFIX_RESPONSE',
    } as any;
    expect(reducer({}, action)).toEqual({
      foo: {
        data: 'BAR',
        state: 'ready',
      },
    });
  });

  describe('_ERROR', () => {
    const action = {
      error: 'error',
      name: 'foo',
      type: 'PREFIX_ERROR',
    } as any;
    expect(reducer({}, action)).toEqual({
      foo: {
        data: null,
        state: 'error',
      },
    });
  });
});
