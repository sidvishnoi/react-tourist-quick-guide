import { mount, shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import React = require('react');
Enzyme.configure({ adapter: new Adapter() });

import Widget from '.';

const Component = ({ value }: { value: string }) => {
  return <div>{value}</div>;
};

describe('Components - Widget', () => {
  it('displays widget when state is `ready`', () => {
    const props = { data: { value: 'foo' }, state: 'ready' };
    const output = shallow(<Widget props={props} component={Component} />);

    expect(output.containsMatchingElement(<Component value="foo" />));
  });

  it('displays error when state is `error`', () => {
    const props = { data: { value: 'foo' }, state: 'error' };
    const output = mount(<Widget props={props} component={Component} />);

    expect(
      output
        .find('h4')
        .last()
        .text()
        .includes('Something went wrong'),
    ).toBeTruthy();
  });

  it('displays Loader when state is `loading`', () => {
    const props = { data: { value: 'foo' }, state: 'loading' };
    const output = mount(<Widget props={props} component={Component} />);

    expect(output.find('svg.loader').exists()).toBeTruthy();
  });
});
