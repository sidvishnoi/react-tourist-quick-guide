// http://www.geonames.org/export/geonames-search.html

const API_URL = 'http://api.geonames.org/searchJSON';

const params = new URLSearchParams();
params.append('username', 'raxapebod');
params.append('cities', 'cities15000');
params.append('orderby', 'relevance');
params.append('maxRows', '20');
params.append('featureClass', 'P');

interface Response {
  geonames: {
    toponymName: string;
    geonameId: number;
  }[];
}

export default async (query: string) => {
  params.set('name_startsWith', query);
  const url = API_URL + '?' + params.toString();
  const response = await fetch(url);
  const json: Response = await response.json();
  const locations = json.geonames.map(res => ({
    id: res.geonameId,
    name: res.toponymName,
  }));
  return Promise.resolve({ query, locations });
};
