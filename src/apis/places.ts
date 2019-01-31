const API_URL = 'http://localhost:8889';

interface Response {
  name: string;
  summary: string;
  link: string;
}

export default async (location: string): Promise<Response> => {
  const params = new URLSearchParams();
  params.set('q', location);
  const url = API_URL + '?' + params.toString();
  const response = await fetch(url);
  const result = await response.json();
  return Promise.resolve(result);
};
