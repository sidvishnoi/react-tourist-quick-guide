const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_URL = CORS_PROXY + 'https://www.distance24.org/route.json';

export default async (source: string, destination: string) => {
  const params = new URLSearchParams();
  params.set('stops', source + '|' + destination);
  const url = API_URL + '?' + params.toString();
  const response = await fetch(url, { cache: 'force-cache' });
  const json = await response.json();
  const distance: number = json.distance;
  return Promise.resolve(distance);
};
