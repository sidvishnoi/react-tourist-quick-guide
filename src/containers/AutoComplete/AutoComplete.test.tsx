import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Dispatch } from 'redux';

import AutoComplete from '.';
import configureStore from '../../configureStore';
import initialState from '../../state';

Enzyme.configure({ adapter: new Adapter() });

const delay = (duration: number) =>
  new Promise(resolve => setTimeout(resolve, duration));

describe('Containers - AutoComplete', () => {
  it('throttles onChange calls', async () => {
    const store = configureStore(initialState);
    const onChange = jest.fn(() => () => {});
    const onSelect = jest.fn(() => () => {});

    const output = mount(
      <Provider store={store}>
        <AutoComplete onChange={onChange} onSelect={onSelect} delay={10} />
      </Provider>,
    );

    const input = output.find('input');
    expect(onChange).toBeCalledTimes(0);
    input.simulate('change', { target: { value: 'ab' } });
    await delay(1);
    input.simulate('change', { target: { value: 'abc' } });
    await delay(1);
    input.simulate('change', { target: { value: 'abc' } });
    await delay(1);
    expect(onChange).toBeCalledTimes(0);
    await delay(10);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith('abc');
  });

  it('renders suggestions onChange', async () => {
    const store = configureStore(initialState);

    const suggestionResponse = {
      query: 'abc',
      locations: [{ id: '1', name: 'abcd' }, { id: '2', name: 'abcde' }],
    };
    const onChange = jest.fn(() => (dispatch: Dispatch) => {
      dispatch({ type: 'SUGGESTION_LOOKUP', query: 'abc' });
      dispatch({ type: 'SUGGESTION_RESPONSE', ...suggestionResponse });
    });
    const onSelect = jest.fn(() => () => {});

    const output = mount(
      <Provider store={store}>
        <AutoComplete onChange={onChange} onSelect={onSelect} delay={1} />
      </Provider>,
    );

    expect(store.getState().search).toMatchObject({
      isLoading: false,
      query: '',
      suggestions: [],
    });

    const input = output.find('input');
    input.simulate('change', { target: { value: 'abc' } });
    await delay(2);
    expect(onChange).toBeCalledTimes(1);

    expect(store.getState().search).toMatchObject({
      isLoading: false,
      query: suggestionResponse.query,
      suggestions: suggestionResponse.locations,
    });
    input.simulate('keyDown', { key: 'ArrowDown', keyCode: 40, which: 40 });

    const menu = output.find('div[role="listbox"]');
    expect(menu.find('div[role="option"]').length).toEqual(2);
  });

  it('calls onSelect on selection', () => {
    const store = configureStore({
      ...initialState,
      search: {
        isLoading: false,
        query: 'PASS',
        suggestions: [{ id: '1', name: 'abcd' }, { id: '2', name: 'abcde' }],
      },
    });
    const onChange = jest.fn(() => () => {});
    const onSelect = jest.fn(() => () => {});

    const output = mount(
      <Provider store={store}>
        <AutoComplete onChange={onChange} onSelect={onSelect} delay={1} />
      </Provider>,
    );

    const input = output.find('input');
    input.simulate('keyDown', { key: 'ArrowDown', keyCode: 40, which: 40 });

    const menu = output.find('div[role="listbox"]');
    expect(menu.find('div[role="option"]').length).toEqual(2);

    input.simulate('keyDown', { key: 'ArrowDown', keyCode: 40, which: 40 });
    const selectedItem = menu.find('div[role="option"]').at(0);

    expect(onSelect).toHaveBeenCalledTimes(0);
    selectedItem.simulate('click');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
