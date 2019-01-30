import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import Weather, { WeatherProps } from '.';
import weatherCodes from '../WeatherDay/weather-codes';

const stories = storiesOf('Weather', module);
stories.addDecorator(withKnobs);

stories.add('weather', () => {
  const keys = Array.from(weatherCodes.keys());
  const conditions = {
    current: select('Current', keys, 'Sunny'),
    day1: select('Current +1', keys, 'Cloudy'),
    day2: select('Current +2', keys, 'Overcast'),
    day3: select('Current +3', keys, 'Mist'),
  };
  const props: WeatherProps = {
    forecast: [
      {
        icon: weatherCodes.get(conditions.day1),
        summary: conditions.day1,
        temperature: 30,
      },
      {
        icon: weatherCodes.get(conditions.day2),
        summary: conditions.day2,
        temperature: 35,
      },
      {
        icon: weatherCodes.get(conditions.day3),
        summary: conditions.day3,
        temperature: 32,
      },
    ],
    icon: weatherCodes.get(conditions.current),
    summary: conditions.current,
    temperature: number('temperature', 30, {
      max: 100,
      min: -50,
      range: true,
      step: 1,
    }),
  };

  return (
    <div style={{ maxWidth: '300px', border: '1px solid #000' }}>
      <Weather
        temperature={props.temperature}
        icon={props.icon}
        forecast={props.forecast}
        summary={props.summary}
      />
    </div>
  );
});
