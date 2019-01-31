// http://www.geonames.org/export/geonames-search.html

const API_URL = 'http://api.geonames.org/searchJSON';

const params = new URLSearchParams();
params.append('username', 'raxapebod');
params.append('cities', 'cities15000');
params.append('orderby', 'relevance');
params.append('maxRows', '20');
params.append('featureClass', 'P');

export default async (query: string) => {
  params.set('name_startsWith', query);
  const url = API_URL + '?' + params.toString();
  const response = await fetch(url);
  const json = await response.json();
  const locations = json.geonames.map(
    ({
      toponymName,
      geonameId,
    }: {
      toponymName: string;
      geonameId: number;
    }) => ({
      id: geonameId,
      name: toponymName,
    }),
  );
  return Promise.resolve({ query, locations });
};
