import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import React = require('react');
import * as renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new Adapter() });

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
          icon: 'sun',
          summary: 'sunny',
          temperature: 39,
        },
        {
          icon: 'rain',
          summary: 'shower',
          temperature: 30,
        },
        {
          icon: 'sun',
          summary: 'sunny',
          temperature: 34,
        },
      ],
      icon: 'sun',
      summary: 'sunny',
      temperature: 40,
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

  it('calls destroyer on remove button click', () => {
    const mover = (): null => null;
    const destroyer = jest.fn();

    const output = mount(
      <City mover={mover} destroyer={destroyer} {...cityProps} />,
    );
    const removeButton = output.find('button.remove');
    expect(destroyer).not.toHaveBeenCalled();
    removeButton.simulate('click');
    expect(destroyer).toHaveBeenCalledTimes(1);
    expect(destroyer).toHaveBeenLastCalledWith(cityProps.name);
  });

  it('calls mover on move button click', () => {
    const mover = jest.fn();
    const destroyer = (): null => null;

    const output = mount(
      <City mover={mover} destroyer={destroyer} {...cityProps} />,
    );
    const moveButton = output.find('button.move');
    expect(mover).not.toHaveBeenCalled();
    moveButton.simulate('click');
    expect(mover).toHaveBeenCalledTimes(1);
    expect(mover).toHaveBeenLastCalledWith(cityProps.name);
  });
});
