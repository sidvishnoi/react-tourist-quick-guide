import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';

import App from '.';
import configureStore from '../../configureStore';
import initialState from '../../state';

Enzyme.configure({ adapter: new Adapter() });

describe('Containers - App', () => {
  it('renders initial page when source is not available', () => {
    const store = configureStore(initialState);
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    const output = mount(app);
    expect(output.find('h1').text()).toEqual('Where are you travelling from?');

    const tree = renderer.create(app);
    expect(tree).toMatchSnapshot();
  });

  it('renders destination search page when source is set', () => {
    const store = configureStore({ ...initialState, source: 'PASS' });
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    const output = mount(app);
    expect(output.find('h1').text()).toEqual('Destinations from PASS:');

    const tree = renderer.create(app);
    expect(tree).toMatchSnapshot();
  });
});
