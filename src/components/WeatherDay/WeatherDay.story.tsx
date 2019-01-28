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

const stories = storiesOf('WeatherDay', module).addDecorator(withKnobs);

stories.add('weather', () => {
  const props: WeatherDayProps = {
    icon: select('icon', ['sun', 'rain'], 'sun'),
    isSmall: boolean('isSmall', false),
    summary: text('summary', 'sunny'),
    temperature: number('temperature', 30, {
      max: 100,
      min: -50,
      range: true,
      step: 1,
    }),
    unit: select('unit', ['C', 'F'], 'C'),
  };

  return (
    <div
      style={{
        border: '1px solid #000',
        maxWidth: props.isSmall ? '100px' : '300px',
      }}
    >
      <WeatherDay
        isSmall={props.isSmall}
        temperature={props.temperature}
        unit={props.unit}
        icon={props.icon}
        summary={props.summary}
      />
    </div>
  );
});
