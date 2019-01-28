import { State } from '../state';
import reducer, { ActionType } from './cities';

describe('Reducers - cities', () => {
  describe('defaults', () => {
    const action = ({ type: 'ANY' } as unknown) as ActionType;
    expect(reducer(undefined, action)).toEqual({ allIds: [], byId: {} });
  });

  describe('ADD_CITY', () => {
    const action = { type: 'ADD_CITY', name: 'PASS' } as ActionType;

    it('does nothing if city is already in list', () => {
      const inputState = { allIds: ['PASS'], byId: {} };
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(inputState);
    });

    it('adds new city when list is empty', () => {
      const inputState = { allIds: [] as string[], byId: {} };
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual({
        allIds: ['PASS'],
        byId: {
          PASS: {
            distance: { data: null, state: 'loading' },
            places: { data: null, state: 'loading' },
            weather: { data: null, state: 'loading' },
          },
        },
      });
    });

    it('adds new city in start of list', () => {
      const inputState = { allIds: ['ONE', 'TWO'], byId: {} };
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual({
        allIds: ['PASS', 'ONE', 'TWO'],
        byId: {
          PASS: {
            distance: { data: null, state: 'loading' },
            places: { data: null, state: 'loading' },
            weather: { data: null, state: 'loading' },
          },
        },
      });
    });
  });

  describe('REMOVE_CITY', () => {
    const action = { type: 'REMOVE_CITY', name: 'DIE' } as ActionType;

    it('does nothing if city is not in list', () => {
      const inputState = { allIds: ['FOO'], byId: {} };
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(inputState);
    });

    it('removes if only item in list', () => {
      const inputState = { allIds: ['DIE'], byId: {} };
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual({ allIds: [], byId: {} });
    });

    it('removes from list with multiple items', () => {
      const inputState = { allIds: ['ONE', 'DIE', 'TWO'], byId: {} };
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual({ allIds: ['ONE', 'TWO'], byId: {} });
    });
  });

  describe('MOVE_CITY_UP', () => {
    const action = { type: 'MOVE_CITY_UP', name: 'UP' } as ActionType;

    it('does nothing if city is not in list', () => {
      const inputState = { allIds: ['FOO'], byId: {} };
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(inputState);
    });

    it('does nothing if city is first item in list', () => {
      const inputState = { allIds: ['UP', 'ONE'], byId: {} };
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(inputState);
    });

    it('moves city up in list of multiple items', () => {
      const inputState = { allIds: ['ONE', 'TWO', 'UP', 'THREE'], byId: {} };
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual({
        allIds: ['ONE', 'UP', 'TWO', 'THREE'],
        byId: {},
      });
    });
  });

  describe('_RESPONSE, _ERROR', () => {
    const inputState: State['cities'] = {
      allIds: ['bar', 'foo'],
      byId: {
        bar: {
          distance: {
            data: 100,
            state: 'ready',
          },
          places: {
            data: null,
            state: 'loading',
          },
          weather: {
            data: null,
            state: 'loading',
          },
        },
        foo: {
          distance: {
            data: null,
            state: 'loading',
          },
          places: {
            data: null,
            state: 'loading',
          },
          weather: {
            data: null,
            state: 'loading',
          },
        },
      },
    };

    it('updates nested state on response', () => {
      const action = {
        name: 'foo',
        response: 200,
        type: 'DISTANCE_RESPONSE',
      } as ActionType;

      expect(reducer(inputState, action)).toEqual({
        ...inputState,
        byId: {
          ...inputState.byId,
          foo: {
            ...inputState.byId.foo,
            distance: {
              data: 200,
              state: 'ready',
            },
          },
        },
      });
    });

    it('updates nested state on error', () => {
      const action = {
        name: 'foo',
        type: 'DISTANCE_ERROR',
      } as ActionType;

      expect(reducer(inputState, action)).toEqual({
        ...inputState,
        byId: {
          ...inputState.byId,
          foo: {
            ...inputState.byId.foo,
            distance: {
              data: null,
              state: 'error',
            },
          },
        },
      });
    });
  });
});
