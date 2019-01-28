import * as React from 'react';
import styled from 'styled-components';

import { iconRain, iconSunny } from '../../images';

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

const StyledWeatherDay = styled.div<{
  isSmall: boolean;
  icon: string;
}>`
  --padding: ${props => (props.isSmall ? '1rem' : '2rem')};
  background-repeat: no-repeat;
  background-position: 80% -10%;
  padding: var(--padding);
  background-size: ${props => (props.isSmall ? '2rem' : '4rem')};
  background-image: url(${props => icons[props.icon]});
  transition: all 0.2s ease;
  flex-grow: ${props => (props.isSmall ? '1' : 'auto')};

  span {
    font-size: ${props => (props.isSmall ? '1.2rem' : '2.5rem')};
  }

  p {
    font-size: 90%;
    font-style: italic;
    margin: 0;
  }

  @media print {
    background-size: 0;
    --padding: 0 0.5rem;
  }
`;

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

function WeatherDay(props: WeatherDayProps & { isSmall: boolean }) {
  const { temperature, unit, icon, summary, isSmall } = props;
  return (
    <StyledWeatherDay isSmall={isSmall} icon={icon}>
      <span>{temperature}</span> °{unit || 'C'}
      <p>{summary}</p>
    </StyledWeatherDay>
  );
}

export default function(props: WeatherProps) {
  const { temperature, unit, icon, forecast, summary } = props;
  return (
    <Weather>
      <div className="Weather-today">
        <WeatherDay
          isSmall={false}
          temperature={temperature}
          unit={unit}
          icon={icon}
          summary={summary}
        />
      </div>
      <WeatherForecast>
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
