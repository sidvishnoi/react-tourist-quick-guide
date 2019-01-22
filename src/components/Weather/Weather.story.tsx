import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select, text } from '@storybook/addon-knobs';
import { specs, describe, it } from 'storybook-addon-specifications';
import { mount } from 'enzyme';
import * as expect from 'expect';
import Weather, { WeatherProps } from '.';

const stories = storiesOf('Weather', module);
stories.addDecorator(withKnobs);

stories.add('weather', () => {
  const props: WeatherProps = {
    unit: select('unit', ['C', 'F'], 'C'),
    temperature: number('temperature', 30, {
      range: true,
      min: -50,
      max: 100,
      step: 1,
    }),
    summary: text('summary', 'sunny'),
    icon: select('icon', ['sun', 'rain'], 'sun'),
    forecast: [
      {
        temperature: 30,
        icon: 'sun',
        summary: 'sunny',
      },
      {
        temperature: 35,
        icon: 'rain',
        summary: 'sunny',
      },
      {
        temperature: 32,
        icon: 'sun',
        summary: 'sunny',
      },
    ],
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
