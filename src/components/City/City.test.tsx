import React = require('react');
import * as renderer from 'react-test-renderer';

import City, { CityProps } from '.';

const cityProps: CityProps = {
  distance: {
    data: 23,
    state: 'ready',
  },
  name: 'CITY',
  places: {
    data: [],
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
      temperature: 30,
    },
    state: 'ready',
  },
};

describe('Component - City', () => {
  it('renders city with proper widgets', () => {
    const mover = (): null => null;
    const destroyer = (): null => null;

    const tree = renderer.create(
      <City mover={mover} destroyer={destroyer} {...cityProps} />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders city with widgets in loading state', () => {
    const mover = (): null => null;
    const destroyer = (): null => null;
    const props: CityProps = {
      distance: {
        data: null,
        state: 'loading',
      },
      name: 'CITY',
      places: {
        data: null,
        state: 'loading',
      },
      weather: {
        data: null,
        state: 'loading',
      },
    };

    const tree = renderer.create(
      <City mover={mover} destroyer={destroyer} {...props} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
