import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import React = require('react');
Enzyme.configure({ adapter: new Adapter() });

import Ad from '.';

describe('Component - Ad', () => {
  it('displays Ad', () => {
    const output = shallow(<Ad />);
    expect(output.find('.Ad').exists()).toEqual(true);
    expect(output.text().includes('Advertisement Space'));
  });
});
