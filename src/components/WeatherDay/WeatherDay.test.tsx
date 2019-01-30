import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new Adapter() });

import WeatherDay, { WeatherDayProps } from '.';

const props: WeatherDayProps = {
  icon: 'sun',
  isSmall: false,
  summary: 'sunny',
  temperature: 30,
  unit: 'F',
};

describe('Components - WeatherDay', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<WeatherDay {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should show temperature value and summary with correct unit', () => {
    const output = mount(<WeatherDay {...props} />);

    expect(output.find('span').text()).toEqual(`${props.temperature}`);
    expect(output.find('p').text()).toEqual(props.summary);
  });
});
