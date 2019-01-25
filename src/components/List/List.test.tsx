import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import * as React from 'react';

Enzyme.configure({ adapter: new Adapter() });

import List from '.';

describe('Components - List', () => {
  it('renders title', () => {
    const output = mount(<List items={[]} title={'TITLE'} />);
    expect(output.find('h3').text()).toEqual('TITLE');
  });

  it('passes theme style', () => {
    const output = mount(<List items={[]} title={'PASS'} color1="red" />);
    expect(output.find('h3')).toHaveStyleRule('color', 'red');
  });

  it('should display list of items', () => {
    const items = [{ name: 'one', link: '#1' }, { name: 'two', link: '#2' }];
    const output = mount(<List items={items} title={'PASS'} />);
    expect(output.find('li').map(i => i.text())).toEqual(
      items.map(i => i.name),
    );
    expect(output.find('li a').map(i => i.prop('href'))).toEqual(
      items.map(i => i.link),
    );
  });
});
