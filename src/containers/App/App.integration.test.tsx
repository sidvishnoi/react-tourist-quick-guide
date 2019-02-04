import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';
import { mocked } from 'ts-jest/utils';

import App from '.';
import configureStore from '../../configureStore';
import initialState, { State } from '../../state';

import distanceAPI from '../../apis/distance';
import locationAPI from '../../apis/location';
import placesAPI from '../../apis/places';
import weatherAPI from '../../apis/weather';

jest.mock('../../apis/distance');
jest.mock('../../apis/location');
jest.mock('../../apis/places');
jest.mock('../../apis/weather');

Enzyme.configure({ adapter: new Adapter() });

const mockResponses = {
  distance: 100,
  weather: {
    forecast: [
      {
        icon: 113,
        summary: 'sunny',
        temperature: 30,
      },
      {
        icon: 230,
        summary: 'sunny',
        temperature: 35,
      },
      {
        icon: 263,
        summary: 'sunny',
        temperature: 32,
      },
    ],
    icon: 227,
    summary: 'sunny',
    temperature: 30,
  },
  location: [
    [{ id: '1', name: 'LOCATION' }],
    [{ id: '2', name: 'LOCATION TWO' }],
    [{ id: '3', name: 'LOCATION THREE' }],
  ],
  places: [
    { title: 'ONE', link: '#', summary: 'summary for ONE' },
    { title: 'TWO', link: '#', summary: 'summary for TWO' },
    { title: 'THREE', link: '#', summary: 'summary for THREE' },
    { title: 'FOUR', link: '#', summary: 'summary for FOUR' },
  ],
};

mocked(distanceAPI).mockResolvedValue(mockResponses.distance);
mocked(locationAPI)
  .mockResolvedValueOnce(mockResponses.location[0])
  .mockResolvedValueOnce(mockResponses.location[1])
  .mockResolvedValue(mockResponses.location[2]);
mocked(placesAPI).mockResolvedValue(mockResponses.places);
mocked(weatherAPI).mockResolvedValue(mockResponses.weather);

const delay = (duration: number) =>
  new Promise(resolve => setTimeout(resolve, duration));

describe('App', () => {
  const createApp = (state: State) => {
    const store = configureStore(state);
    const ReactApp = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    const app = mount(ReactApp);
    return { store, app, ReactApp };
  };

  const readyState = {
    ...initialState,
    source: 'LOCATION',
    cities: {
      allIds: ['LOCATION TWO', 'LOCATION THREE'],
      byId: {
        'LOCATION TWO': {
          weather: { state: 'ready', data: mockResponses.weather },
          places: { state: 'ready', data: mockResponses.places },
          distance: { state: 'ready', data: mockResponses.distance },
        },
        'LOCATION THREE': {
          weather: { state: 'ready', data: mockResponses.weather },
          places: { state: 'ready', data: mockResponses.places },
          distance: { state: 'ready', data: mockResponses.distance },
        },
      },
    },
  };

  it('lets add a source city', async () => {
    const { app, store } = createApp(initialState);

    expect(app.find('h1').text()).toEqual('Where are you travelling from?');

    const input = app.find('input');
    input.simulate('change', { target: { value: 'FOO' } });
    await delay(310);
    input.simulate('keyDown', { key: 'ArrowDown', keyCode: 40, which: 40 });

    expect(store.getState().search.query).toEqual('FOO');
    expect(store.getState().search.suggestions.length).toEqual(1);
    const menu = app.find('div[role="listbox"]');
    const options = menu.find('div[role="option"]');
    expect(options.length).toEqual(1);

    expect(store.getState().source).toEqual('');
    options.at(0).simulate('click');
    expect(store.getState().source).toEqual('LOCATION');
    expect(app.find('h1').text()).toEqual('Destinations from LOCATION:');
  });

  it('lets add a new destination', async () => {
    const { app, store, ReactApp } = createApp({
      ...initialState,
      source: 'LOCATION',
    });
    expect(app.find('h1').text()).toEqual('Destinations from LOCATION:');
    expect(store.getState().source).toEqual('LOCATION');

    const input = app.find('input');
    input.simulate('change', { target: { value: 'FOO' } });
    await delay(310);
    input.simulate('keyDown', { key: 'ArrowDown', keyCode: 40, which: 40 });

    let options = app.find('div[role="listbox"] div[role="option"]');
    expect(options.length).toEqual(1);

    expect(store.getState().cities.allIds.length).toEqual(0);

    options.at(0).simulate('click');
    await delay(10);
    let state = store.getState().cities;
    expect(state.allIds).toEqual(['LOCATION TWO']);
    let city = state.byId['LOCATION TWO'];
    expect(city).toBeDefined();
    expect(city.weather.data).toEqual(mockResponses.weather);
    expect(city.places.data).toEqual(mockResponses.places);
    expect(city.distance.data).toEqual(mockResponses.distance);

    expect(renderer.create(ReactApp)).toMatchSnapshot();

    input.simulate('change', { target: { value: 'BAR' } });
    await delay(310);
    input.simulate('keyDown', { key: 'ArrowDown', keyCode: 40, which: 40 });
    options = app.find('div[role="listbox"] div[role="option"]');
    options.at(0).simulate('click');
    await delay(10);
    state = store.getState().cities;
    expect(state.allIds).toEqual(['LOCATION THREE', 'LOCATION TWO']);
    city = state.byId['LOCATION THREE'];
    expect(city).toBeDefined();
    expect(city.weather.data).toEqual(mockResponses.weather);
    expect(city.places.data).toEqual(mockResponses.places);
    expect(city.distance.data).toEqual(mockResponses.distance);

    expect(renderer.create(ReactApp)).toMatchSnapshot();
  });

  it('lets move a city up in destinations list', () => {
    const { app, store, ReactApp } = createApp(readyState);

    expect(app.find('div.city').length).toEqual(2);
    const moveButton = app
      .find('div.city')
      .at(1)
      .find('button.move');

    expect(store.getState().cities.allIds).toEqual([
      'LOCATION TWO',
      'LOCATION THREE',
    ]);
    moveButton.simulate('click');
    expect(store.getState().cities.allIds).toEqual([
      'LOCATION THREE',
      'LOCATION TWO',
    ]);
    expect(renderer.create(ReactApp)).toMatchSnapshot();
  });

  it('lets remove a city from destinations list', () => {
    const { app, store, ReactApp } = createApp(readyState);

    expect(app.find('div.city').length).toEqual(2);
    const removeButton = app
      .find('div.city')
      .first()
      .find('button.remove');

    expect(store.getState().cities.allIds).toEqual([
      'LOCATION TWO',
      'LOCATION THREE',
    ]);
    removeButton.simulate('click');
    expect(store.getState().cities.allIds).toEqual([
      'LOCATION THREE',
    ]);
    expect(renderer.create(ReactApp)).toMatchSnapshot();
  });
});
