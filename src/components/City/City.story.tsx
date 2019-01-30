import { action } from '@storybook/addon-actions';
import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import City, { CityProps } from '.';

const stories = storiesOf('City', module);
stories.addDecorator(withKnobs);

stories.add('city', () => {
  const props: CityProps = {
    distance: {
      data: number('distance', 50),
      state: 'ready',
    },
    name: text('city.name', 'London'),
    places: {
      data: [
        { name: 'Place 1', link: '#' },
        { name: 'Place 2', link: '#' },
        { name: 'Place 3', link: '#' },
        { name: 'Place 4', link: '#' },
        { name: 'Place 5', link: '#' },
      ],
      state: 'ready',
    },
    weather: {
      data: {
        forecast: [
          {
            icon: 113,
            summary: 'sunny',
            temperature: 30,
          },
          {
            icon: 119,
            summary: 'shower',
            temperature: 35,
          },
          {
            icon: 179,
            summary: 'sunny',
            temperature: 32,
          },
        ],
        icon: 260,
        summary: 'sunny',
        temperature: number('weather.temperature', 30, {
          max: 100,
          min: -100,
          range: true,
          step: 1,
        }),
      },
      state: 'ready',
    },
  };
  return (
    <City
      name={props.name}
      distance={props.distance}
      weather={props.weather}
      places={props.places}
      destroyer={action('REMOVE_CITY')}
      mover={action('MOVE_CITY_UP')}
    />
  );
});
