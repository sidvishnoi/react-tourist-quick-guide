import { State } from '../state';
import reducer, { ActionType } from './cities';

describe('Reducers - cities', () => {
  describe('defaults', () => {
    const action = { type: 'ANY' } as ActionType;
    expect(reducer(undefined, action)).toEqual([]);
  });

  describe('ADD_CITY', () => {
    const action = { type: 'ADD_CITY', name: 'PASS' };

    it('does nothing if city is already in list', () => {
      const inputState = ['PASS'];
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(inputState);
    });

    it('adds new city when list is empty', () => {
      const inputState = [] as State['cities'];
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(['PASS']);
    });

    it('adds new city in start of list', () => {
      const inputState = ['ONE', 'TWO'];
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(['PASS', 'ONE', 'TWO']);
    });
  });

  describe('REMOVE_CITY', () => {
    const action = { type: 'REMOVE_CITY', name: 'DIE' };

    it('does nothing if city is not in list', () => {
      const inputState = ['FOO'];
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(inputState);
    });

    it('removes if only item in list', () => {
      const inputState = ['DIE'];
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual([]);
    });

    it('removes from list with multiple items', () => {
      const inputState = ['ONE', 'DIE', 'TWO'];
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(['ONE', 'TWO']);
    });
  });

  describe('MOVE_CITY_UP', () => {
    const action = { type: 'MOVE_CITY_UP', name: 'UP' };

    it('does nothing if city is not in list', () => {
      const inputState = ['FOO'];
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(inputState);
    });

    it('does nothing if city is first item in list', () => {
      const inputState = ['UP', 'ONE'];
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(inputState);
    });

    it('moves city up in list of multiple items', () => {
      const inputState = ['ONE', 'TWO', 'UP', 'THREE'];
      const outputState = reducer(inputState, action);
      expect(outputState).toEqual(['ONE', 'UP', 'TWO', 'THREE']);
    });
  });
});
