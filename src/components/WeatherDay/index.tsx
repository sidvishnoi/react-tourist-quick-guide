import * as React from 'react';
import styled from 'styled-components';

export interface WeatherDayProps {
  temperature: number;
  icon: number;
  summary: string;
}

const WeatherDay = styled.div<{ isSmall: boolean }>`
  --padding: ${props => (props.isSmall ? '1rem' : '2rem')};
  background-repeat: no-repeat;
  background-position: top right;
  background-size: ${props => (props.isSmall ? '2rem' : 'auto')};
  padding: var(--padding);
  transition: all 0.2s ease;
  flex-grow: 1;

  span {
    font-size: ${props => (props.isSmall ? '1.2rem' : '2.5rem')};
  }

  p {
    font-size: 70%;
    font-style: italic;
    margin: 0;
    max-width: 70%;
  }

  @media print {
    background-size: 0;
    --padding: 0 0.5rem;

    span {
      font-size: ${props => (props.isSmall ? '1.2rem' : '2rem')};
    }
  }
`;

export default function(props: WeatherDayProps & { isSmall?: boolean }) {
  const { temperature, icon, summary, isSmall = false } = props;
  const backgroundImage = `url(/images/weather-icons/${icon}.png)`;
  return (
    <WeatherDay
      isSmall={isSmall}
      style={{ backgroundImage }}
      className="weather-day"
    >
      <span>{temperature}</span>°C
      <p>{summary}</p>
    </WeatherDay>
  );
}
