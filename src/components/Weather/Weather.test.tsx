import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new Adapter() });

import Weather, { WeatherProps } from '.';

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
  icon: 'sun',
  summary: 'sunny',
  temperature: 30,
  unit: 'F',
};

describe('Components - Weather', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Weather {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should show temperature value and summary with correct unit', () => {
    const output = mount(<Weather {...props} />);
    expect(output.find('.weather-today span').text()).toEqual(
      `${props.temperature}`,
    );
    expect(output.find('.weather-today p').text()).toEqual(props.summary);
  });

  it('should show forecast for next 3 days', () => {
    const output = mount(<Weather {...props} />);
    const forecast = output.find('div.weather-forecast');
    expect(forecast.find('div.weather-day').length).toEqual(3);
  });
});
