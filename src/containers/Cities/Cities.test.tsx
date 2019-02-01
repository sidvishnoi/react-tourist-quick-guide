import { mount, shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';

import Cities from '.';
import Ad from '../../components/Ad';
import configureStore from '../../configureStore';
import initialStateDefault, { State } from '../../state';

Enzyme.configure({ adapter: new Adapter() });

const initialState: State = {
  ...initialStateDefault,
  source: 'PASS',
  cities: {
    allIds: ['ONE', 'TWO'],
    byId: {
      ONE: {
        distance: {
          state: 'ready',
          data: 50,
        },
        weather: {
          state: 'ready',
          data: {
            icon: 113,
            summary: 'Sunny',
            temperature: 35,
            forecast: [
              { icon: 113, summary: 'Sunny', temperature: 35 },
              { icon: 113, summary: 'Sunny', temperature: 35 },
              { icon: 113, summary: 'Sunny', temperature: 35 },
            ],
          },
        },
        places: {
          state: 'ready',
          data: [
            { title: 'FOO', summary: 'foo', link: '#' },
            { title: 'BAR', summary: 'bar', link: '#' },
            { title: 'BAZ', summary: 'baz', link: '#' },
          ],
        },
      },
      TWO: {
        distance: { state: 'ready', data: 100 },
        weather: { state: 'error', data: null },
        places: { state: 'loading', data: null },
      },
    },
  },
};

describe('Containers - Cities', () => {
  it('renders cities when cities count is 0', () => {
    const store = configureStore({
      ...initialState,
      cities: {
        allIds: [],
        byId: {},
      },
    });
    const app = (
      <Provider store={store}>
        <Cities />
      </Provider>
    );

    const output = mount(app);
    expect(output.find('.city').length).toEqual(0);
    expect(output.containsMatchingElement(<Ad />)).toBeTruthy();

    const tree = renderer.create(app);
    expect(tree).toMatchSnapshot();
  });

  it('renders cities when cities count is more than 0', () => {
    const store = configureStore(initialState);
    const app = (
      <Provider store={store}>
        <Cities />
      </Provider>
    );

    const output = mount(app);

    expect(output.find('div.city').length).toEqual(2);
    expect(output.containsMatchingElement(<Ad />)).toBeTruthy();

    const tree = renderer.create(app);
    expect(tree).toMatchSnapshot();
  });

  it('allows removing city from list', () => {
    const store = configureStore(initialState);
    const app = (
      <Provider store={store}>
        <Cities />
      </Provider>
    );

    const output = mount(app);

    expect(output.find('div.city').length).toEqual(2);
    expect(store.getState().cities.allIds).toEqual(['ONE', 'TWO']);
    expect(renderer.create(app)).toMatchSnapshot();

    const removeButton = output.find('button.remove').first();
    removeButton.simulate('click');
    expect(output.find('div.city').length).toEqual(1);
    expect(store.getState().cities.allIds).toEqual(['TWO']);
    expect(renderer.create(app)).toMatchSnapshot();
  });

  it('allows moving a city up in list', () => {
    const store = configureStore(initialState);
    const app = (
      <Provider store={store}>
        <Cities />
      </Provider>
    );

    const output = mount(app);

    expect(output.find('div.city').length).toEqual(2);
    expect(store.getState().cities.allIds).toEqual(['ONE', 'TWO']);
    expect(renderer.create(app)).toMatchSnapshot();

    const removeButton = output.find('button.move').at(1);
    removeButton.simulate('click');
    expect(output.find('div.city').length).toEqual(2);
    expect(store.getState().cities.allIds).toEqual(['TWO', 'ONE']);
    expect(renderer.create(app)).toMatchSnapshot();
  });
});
