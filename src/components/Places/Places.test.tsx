import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

import Places from '.';

describe('Components - List', () => {
  const places = [{ name: 'one', link: '#1' }, { name: 'two', link: '#2' }];

  it('matches snapshot', () => {
    const tree = renderer.create(<Places places={places} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders title', () => {
    const output = mount(<Places places={places} />);
    expect(output.find('h3').text()).toEqual('Top 2 tourist places:');
  });

  it('should display list of places', () => {
    const output = mount(<Places places={places} />);
    expect(output.find('li').map(p => p.text())).toEqual(
      places.map(place => place.name),
    );
    expect(output.find('li a').map(p => p.prop('href'))).toEqual(
      places.map(place => place.link),
    );
  });
});
