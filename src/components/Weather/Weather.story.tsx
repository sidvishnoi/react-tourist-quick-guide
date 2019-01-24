import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { mount } from 'enzyme';
import * as expect from 'expect';
import { describe, it, specs } from 'storybook-addon-specifications';

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

  const story = (
    <Weather
      temperature={props.temperature}
      unit={props.unit}
      icon={props.icon}
      forecast={props.forecast}
      summary={props.summary}
    />
  );

  specs(() =>
    describe('weather', () => {
      it('should show temperature value and summary with correct unit', () => {
        const output = mount(story);
        expect(output.find('.Weather-today .Weather-day-value').text()).toEqual(
          `${props.temperature}`,
        );
        expect(
          output.find('.Weather-today .Weather-day-summary').text(),
        ).toEqual(props.summary);
      });

      it('should show forecast for next 3 days', () => {
        const output = mount(story);
        expect(output.find('.Weather-forecast .Weather-day').length).toEqual(3);
      });
    }),
  );
  return story;
});
