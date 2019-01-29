import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import React = require('react');
import * as renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new Adapter() });

import IconButton from '.';

describe('Components - IconButton', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <IconButton icon="§" title="PASS" background="red" />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('calls onClick', () => {
    const onClick = jest.fn();
    const output = mount(<IconButton icon="∆" onClick={onClick} />);
    expect(onClick).not.toHaveBeenCalled();
    output.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
