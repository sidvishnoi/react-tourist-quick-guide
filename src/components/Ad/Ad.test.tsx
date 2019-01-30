import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import React = require('react');
import * as renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new Adapter() });

import Ad from '.';

describe('Component - Ad', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Ad />);
    expect(tree).toMatchSnapshot();
  });

  it('displays Ad', () => {
    const output = shallow(<Ad />);
    expect(output.text().includes('Advertisement Space'));
  });
});
