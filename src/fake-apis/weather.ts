import { WeatherProps } from "../components/Weather";

export default (location: string, delay: number) => {
  const temperature = () => 30 + Math.floor(Math.random() * 10);
  const summary = () => Math.random() > 0.5 ? 'sunny' : 'rainy';
  const icon = () => Math.random() > 0.5 ? 'sun' : 'rain';

  const forecast = [];
  for (let i = 0; i < 3; ++i) {
    forecast.push({
      icon: icon(),
      summary: summary(),
      temperature: temperature(),
    });
  }
  const response: WeatherProps = {
    forecast,
    icon: icon(),
    summary: summary(),
    temperature: temperature(),
  };
  return new Promise(resolve =>
    setTimeout(() => resolve(response), delay),
  );
};
