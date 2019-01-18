import { Dispatch } from 'redux';

export function getSuggestions(term: string) {
  return function(dispatch: Dispatch) {
    dispatch({ type: 'SUGGESTION_LOOKUP', term });

    fakeApi(term, 1000)
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

function fakeApi(term: string, delay: number) {
  if (new Set(['foo', 'bar', 'fooo']).has(term)) {
    return Promise.reject({ term, terms: [] as string[] });
  }
  const n = 3 + Math.floor(Math.random() * 6);
  const terms = [term];
  for (let i = 0; i < n; ++i)
    terms.push(
      term + Math.random()
        .toString(36)
        .substring(7),
    );
  return new Promise<{ terms: string[]; term: string }>(resolve =>
    setTimeout(() => {
      const response = { terms, term };
      resolve(response);
    }, delay),
  );
}
