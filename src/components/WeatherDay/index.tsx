import * as React from 'react';
import styled from 'styled-components';

import { iconRain, iconSunny } from '../../images';

const icons: { [name: string]: any } = {
  rain: iconRain,
  sun: iconSunny,
};

export interface WeatherDayProps {
  isSmall: boolean;
  temperature: number;
  unit?: 'C' | 'F';
  icon: string;
  summary: string;
}

const WeatherDay = styled.div<{
  isSmall: boolean;
  icon: any;
}>`
  --padding: ${props => (props.isSmall ? '1rem' : '2rem')};
  background-repeat: no-repeat;
  background-position: 80% -10%;
  padding: var(--padding);
  background-size: ${props => (props.isSmall ? '2rem' : '4rem')};
  background-image: url(${props => props.icon});
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

    span {
      font-size: ${props => (props.isSmall ? '1.2rem' : '2rem')};
    }
  }
`;

export default function(props: WeatherDayProps) {
  const { temperature, unit, icon, summary, isSmall } = props;
  return (
    <WeatherDay isSmall={isSmall} icon={icons[icon]} className="weather-day">
      <span>{temperature}</span> °{unit || 'C'}
      <p>{summary}</p>
    </WeatherDay>
  );
}
