import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

import Link from '.';

describe('Components - Link', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Link href="LINK">TEXT</Link>);
    expect(tree).toMatchSnapshot();
  });

  it('renders <a> element', () => {
    const output = mount(<Link href="LINK">TEXT</Link>);

    expect(output.getDOMNode().nodeName).toEqual('A');
    expect(output.text()).toEqual('TEXT');
    expect(output.prop('href')).toEqual('LINK');
  });

  it('uses default color', () => {
    const output = mount(<Link href="LINK">TEXT</Link>);
    expect(output).toHaveStyleRule('color', '#333');
  });

  it('allows overriding props', () => {
    const output = mount(
      <Link href="LINK" color="red" role="button">
        TEXT
      </Link>,
    );
    expect(output).toHaveStyleRule('color', 'red');
    expect(output.prop('role')).toEqual('button');
  });
});
