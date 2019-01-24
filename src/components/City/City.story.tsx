import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select, text } from '@storybook/addon-knobs';
import { specs, describe, it } from 'storybook-addon-specifications';
import { shallow } from 'enzyme';
import * as expect from 'expect';
import City, { CityProps } from '.';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('City', module);
stories.addDecorator(withKnobs);

stories.add('city', () => {
  const props: CityProps = {
    name: text('city.name', 'London'),
    distance: {
      state: 'ready',
      data: number('distance', 50),
    },
    weather: {
      state: 'ready',
      data: {
        unit: select('weather.unit', ['C', 'F'], 'C'),
        temperature: number('weather.temperature', 30, {
          range: true,
          min: -100,
          max: 100,
          step: 1,
        }),
        icon: 'sun',
        summary: 'sunny',
        forecast: [
          {
            temperature: 30,
            icon: 'sun',
            summary: 'sunny',
          },
          {
            temperature: 35,
            icon: 'rain',
            summary: 'shower',
          },
          {
            temperature: 32,
            icon: 'sun',
            summary: 'sunny',
          },
        ],
      },
    },
    places: {
      state: 'ready',
      data: [
        { name: 'Place 1', link: '#' },
        { name: 'Place 2', link: '#' },
        { name: 'Place 3', link: '#' },
        { name: 'Place 4', link: '#' },
        { name: 'Place 5', link: '#' },
      ],
    },
  };
  const story = (
    <City
      name={props.name}
      distance={props.distance}
      weather={props.weather}
      places={props.places}
      destroyer={action('REMOVE_CITY')}
    />
  );

  specs(() =>
    describe('city', () => {
      it('should show city with proper widgets', () => {});
    }),
  );
  return story;
});
