import * as React from 'react';
import { iconRain, iconSunny } from '../../images';
import './Weather.css';

interface WeatherDayProps {
  temperature: number;
  unit?: 'C' | 'F';
  icon: string;
  summary: string;
}

export interface WeatherProps extends WeatherDayProps {
  forecast: { temperature: number; icon: string; summary: string }[];
}

const icons: { [name: string]: any } = {
  rain: iconRain,
  sun: iconSunny,
};

function WeatherDay(props: WeatherDayProps) {
  const { temperature, unit, icon, summary } = props;
  return (
    <div
      className="Weather-day"
      style={{
        backgroundImage: `url(${icons[icon]})`,
      }}
    >
      <span className="Weather-day-value">{temperature}</span> °{unit}
      <p className="Weather-day-summary">{summary}</p>
    </div>
  );
}

export default function Weather(props: WeatherProps) {
  const { temperature, unit = 'C', icon, forecast, summary } = props;
  return (
    <div className="Weather">
      <div className="Weather-today">
        <WeatherDay
          temperature={temperature}
          unit={unit}
          icon={icon}
          summary={summary}
        />
      </div>
      <div className="Weather-forecast">
        {forecast.map((day, i) => (
          <WeatherDay
            temperature={day.temperature}
            unit={unit}
            icon={day.icon}
            summary={day.summary}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
