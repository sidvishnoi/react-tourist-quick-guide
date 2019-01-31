import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import React = require('react');
import * as renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new Adapter() });

import Text from '.';

describe('Components - Text', () => {
  it('lets use `as` to change DOMNode type', () => {
    const output = mount(<Text as="h1">PASS</Text>);
    expect(output.find('h1').exists()).toBeTruthy();
    expect(output.find('h1').text()).toEqual('PASS');
  });

  it('lets change style', () => {
    const output = mount(
      <Text as="h1" size="fsize_08">
        PASS
      </Text>,
    );
    expect(output.find('h1')).toHaveStyleRule('font-size', '2.125rem');
  });

  it('matches snapshot', () => {
    const tree = renderer.create(
      <Text as="h2" size="fsize_07" family="sans-serif">
        PASS
      </Text>,
    );
    expect(tree).toMatchSnapshot();
  });
});
