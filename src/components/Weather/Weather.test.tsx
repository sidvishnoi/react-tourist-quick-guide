import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
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
  it('should show temperature value and summary with correct unit', () => {
    const output = mount(<Weather {...props} />);
    expect(output.find('.Weather-today .Weather-day-value').text()).toEqual(
      `${props.temperature}`,
    );
    expect(output.find('.Weather-today .Weather-day-summary').text()).toEqual(
      props.summary,
    );
  });

  it('should show forecast for next 3 days', () => {
    const output = mount(<Weather {...props} />);
    expect(output.find('.Weather-forecast .Weather-day').length).toEqual(3);
  });
});
