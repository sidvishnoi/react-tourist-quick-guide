export default (query: string, delay: number) => {
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
};
