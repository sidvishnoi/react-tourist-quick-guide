import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

import Places, { PlacesProps } from '.';

describe('Components - Places', () => {
  const places: PlacesProps['places'] = [
    { title: 'one', link: '#1', summary: 'foo' },
    { title: 'two', link: '#2', summary: 'bar' },
  ];

  it('matches snapshot', () => {
    const tree = renderer.create(<Places places={places} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders title', () => {
    const output = mount(<Places places={places} />);
    expect(output.find('h3').text()).toEqual('Top tourist places:');
  });

  it('should display list of places', () => {
    const output = mount(<Places places={places} />);
    expect(output.find('li').map(p => p.text())).toEqual(
      places.map(place => place.title + ': ' + place.summary),
    );
    expect(output.find('li em').map(p => p.text())).toEqual(
      places.map(place => place.summary),
    );
    expect(output.find('li a').map(p => p.prop('href'))).toEqual(
      places.map(place => place.link),
    );
  });
});
