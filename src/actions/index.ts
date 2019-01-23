import { Dispatch } from 'redux';

export function getSuggestions(query: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'SUGGESTION_LOOKUP', query });

    fakeApi(query, 1000)
      .then(response => {
        dispatch({
          type: 'SUGGESTION_RESPONSE',
          ...response,
        });
      })
      .catch(error => {
        dispatch({
          type: 'SUGGESTION_RESPONSE_ERROR',
          error: error.message,
        });
      });
  };
}

export const searchUpdate = (query: string) => ({
  type: 'SUGGESTION_UPDATE',
  query,
});

export function selectLocation(location: string) {
  return (dispatch: Dispatch) => {
    dispatch(searchUpdate(''));
    dispatch({ type: 'LOCATION_SELECT', location });
  };
}

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
