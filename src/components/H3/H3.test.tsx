import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import React = require('react');
import * as renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new Adapter() });

import H3 from '.';

describe('Component - H3', () => {
  it('renders without border', () => {
    const tree = renderer.create(<H3>PASS</H3>);
    expect(tree).toMatchSnapshot();

    const output = mount(<H3>PASS</H3>);
    expect(output).not.toHaveStyleRule('border-bottom');
  });

  it('renders with border', () => {
    const tree = renderer.create(<H3 bordered>PASS</H3>);
    expect(tree).toMatchSnapshot();

    const output = mount(<H3 bordered>PASS</H3>);
    expect(output).toHaveStyleRule('border-bottom', '2px solid var(--color)');
  });

  it('can change border color', () => {
    const tree = renderer.create(
      <H3 bordered color="red">
        PASS
      </H3>,
    );
    expect(tree).toMatchSnapshot();

    const output = mount(
      <H3 bordered color="red">
        PASS
      </H3>,
    );
    expect(output).toHaveStyleRule('--color', 'red');
  });
});
