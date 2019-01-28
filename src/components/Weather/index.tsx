import * as React from 'react';
import styled from 'styled-components';

import WeatherDay from '../WeatherDay';

export interface WeatherProps {
  temperature: number;
  unit?: 'C' | 'F';
  icon: string;
  summary: string;
  forecast: { temperature: number; icon: string; summary: string }[];
}

const Weather = styled.div`
  background: #fff;

  @media print {
    display: flex;
  }
`;

const WeatherForecast = styled.div`
  display: flex;

  @media print {
    flex-direction: column;
  }
`;

export default function(props: WeatherProps) {
  const { temperature, unit, icon, forecast, summary } = props;
  return (
    <Weather>
      <div className="weather-today">
        <WeatherDay
          isSmall={false}
          temperature={temperature}
          unit={unit}
          icon={icon}
          summary={summary}
        />
      </div>
      <WeatherForecast className="weather-forecast">
        {forecast.map((day, i) => (
          <WeatherDay
            key={i}
            isSmall={true}
            temperature={day.temperature}
            unit={unit}
            icon={day.icon}
            summary={day.summary}
          />
        ))}
      </WeatherForecast>
    </Weather>
  );
}
