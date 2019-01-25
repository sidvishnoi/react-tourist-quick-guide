import { AnyAction } from 'redux';

export default function createReducer<State, ResponseType>(
  prefix: string,
  initialState: State,
) {
  interface SearchAction extends AnyAction {
    name: string;
  }

  interface ResponseAction extends AnyAction {
    name: string;
    response: ResponseType;
  }

  interface ErrorAction extends AnyAction {
    name: string;
    error: string;
  }

  type ActionType = SearchAction & ResponseAction & ErrorAction;

  return (state: State = initialState, action: ActionType) => {
    const { name } = action;
    switch (action.type) {
      case `${prefix}_SEARCH`:
        return {
          ...state,
          [name]: {
            data: null,
            state: 'loading',
          },
        };
      case `${prefix}_RESPONSE`: {
        return {
          ...state,
          [name]: {
            data: action.response,
            state: 'ready',
          },
        };
      }
      case `${prefix}_ERROR`:
        return {
          ...state,
          [name]: {
            data: null,
            state: 'error',
          },
        };
      default:
        return state;
    }
  };
}
