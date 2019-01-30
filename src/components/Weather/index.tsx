import * as React from 'react';
import styled from 'styled-components';

import WeatherDay, { WeatherDayProps } from '../WeatherDay';

export interface WeatherProps extends WeatherDayProps {
  forecast: WeatherDayProps[];
}

const Weather = styled.div`
  background: #fff;

  @media print {
    display: flex;
  }
`;

const WeatherForecast = styled.div`
  display: flex;

  > div {
    width: 33%;
  }

  @media print {
    flex-direction: column;

    > div {
      width: 100%;
    }
  }
`;

export default function(props: WeatherProps) {
  const { temperature, icon, forecast, summary } = props;
  return (
    <Weather>
      <div className="weather-today">
        <WeatherDay
          isSmall={false}
          temperature={temperature}
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
            icon={day.icon}
            summary={day.summary}
          />
        ))}
      </WeatherForecast>
    </Weather>
  );
}
