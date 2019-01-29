import { WeatherProps } from '../components/Weather';
// https://www.apixu.com/doc/
const API_URL = 'https://api.apixu.com/v1/forecast.json';

const params = new URLSearchParams();
params.append('key', 'fa9ee5a997ae4d448ad110533192901');
params.append('days', '3');

export default async (location: string): Promise<WeatherProps> => {
  params.set('q', location);
  const url = API_URL + '?' + params.toString();
  const response = await fetch(url);
  const json = await response.json();
  const result = {
    forecast: [] as WeatherProps['forecast'],
    icon: 'sun',
    summary: json.current.condition.text,
    temperature: Math.round(json.current.temp_c),
  };
  for (const day of json.forecast.forecastday) {
    result.forecast.push({
      icon: 'sun',
      summary: day.day.condition.text,
      temperature: Math.round(day.day.avgtemp_c),
    });
  }
  return Promise.resolve(result);
};
