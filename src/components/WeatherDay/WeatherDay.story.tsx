import {
  boolean,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import WeatherDay, { WeatherDayProps } from '.';
import weatherCodes from './weather-codes';

const stories = storiesOf('WeatherDay', module).addDecorator(withKnobs);

stories.add('weather', () => {
  const condition = select(
    'weather condition',
    Array.from(weatherCodes.keys()),
    'Sunny',
  );
  const props: WeatherDayProps = {
    icon: weatherCodes.get(condition),
    summary: condition,
    temperature: number('temperature', 30, {
      max: 100,
      min: -50,
      range: true,
      step: 1,
    }),
  };

  const isSmall = boolean('isSmall', false);

  return (
    <div
      style={{
        border: '1px solid #000',
        maxWidth: isSmall ? '100px' : '300px',
      }}
    >
      <WeatherDay
        isSmall={isSmall}
        temperature={props.temperature}
        icon={props.icon}
        summary={props.summary}
      />
    </div>
  );
});
