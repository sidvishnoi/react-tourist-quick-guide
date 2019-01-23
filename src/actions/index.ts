import { Dispatch } from 'redux';
import { State } from '../reducers';

export const getSuggestions = (id: 'source' | 'destination') => (
  query: string,
) => (dispatch: Dispatch) => {
  dispatch({ type: 'SUGGESTION_LOOKUP', query, id });

  fakeApi(query, 1000)
    .then(response => {
      dispatch({
        type: 'SUGGESTION_RESPONSE',
        id,
        ...response,
      });
    })
    .catch(error => {
      dispatch({
        type: 'SUGGESTION_RESPONSE_ERROR',
        id,
        error: error.message,
      });
    });
};

export const searchUpdate = (query: string, id: 'source' | 'destination') => ({
  type: 'SUGGESTION_UPDATE',
  query,
  id,
});

export const selectLocation = (id: 'source' | 'destination') => (
  location: string,
  dispatch: Dispatch,
) => {
  if (id === 'source') {
    dispatch(searchUpdate('', 'destination'));
  }
  dispatch({ type: 'LOCATION_SELECT', location, id });
};

function fakeApi(query: string, delay: number) {
  if (new Set(['foo', 'bar', 'fooo']).has(query)) {
    return Promise.reject({ query, locations: [] });
  }
  const n = 3 + Math.floor(Math.random() * 6);
  const locations = [{ name: query, id: query }];
  for (let i = 0; i < n; ++i) {
    const str = Math.random()
      .toString(36)
      .substring(7);
    locations.push({ name: query + str, id: str });
  }
  return new Promise<{
    locations: { name: string; id: string }[];
    query: string;
  }>(resolve =>
    setTimeout(() => {
      const response = { locations, query };
      resolve(response);
    }, delay),
  );
}
