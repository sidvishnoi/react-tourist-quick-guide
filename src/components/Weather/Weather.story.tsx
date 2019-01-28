import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import Weather, { WeatherProps } from '.';

const stories = storiesOf('Weather', module);
stories.addDecorator(withKnobs);

stories.add('weather', () => {
  const props: WeatherProps = {
    forecast: [
      {
        icon: 'sun',
        summary: 'sunny',
        temperature: 30,
      },
      {
        icon: 'rain',
        summary: 'sunny',
        temperature: 35,
      },
      {
        icon: 'sun',
        summary: 'sunny',
        temperature: 32,
      },
    ],
    icon: select('icon', ['sun', 'rain'], 'sun'),
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
    <div style={{ maxWidth: '300px', border: '1px solid #000' }}>
      <Weather
        temperature={props.temperature}
        unit={props.unit}
        icon={props.icon}
        forecast={props.forecast}
        summary={props.summary}
      />
    </div>
  );
});
