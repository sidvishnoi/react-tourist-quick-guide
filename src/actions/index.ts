import { Dispatch } from 'redux';

export function getSuggestions(query: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'SUGGESTION_LOOKUP', query });

    fakeApi(query, 10)
      .then(response => {
        dispatch({
          type: 'SUGGESTION_RESPONSE',
          ...response,
        });
      })
      .catch(error => {
        dispatch({
          error: error.message,
          type: 'SUGGESTION_RESPONSE_ERROR',
        });
      });
  };
}

export const searchUpdate = (query: string) => ({
  query,
  type: 'SUGGESTION_UPDATE',
});

export function addCity(name: string) {
  return (dispatch: Dispatch) => {
    dispatch(searchUpdate(''));
    dispatch({ type: 'ADD_CITY', name });
    dispatch({ type: 'WEATHER_SEARCH', name });
    dispatch({ type: 'PLACES_SEARCH', name });
    dispatch({ type: 'DISTANCE_SEARCH', name });
  };
}

export function removeCity(name: string) {
  return { type: 'REMOVE_CITY', name };
}

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
