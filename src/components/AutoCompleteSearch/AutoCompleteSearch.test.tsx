import { mount, shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import React = require('react');
Enzyme.configure({ adapter: new Adapter() });

import AutoCompleteSearch from '.';

const noop = (): null => null;

describe('Components - AutoCompleteSearch', () => {
  it('displays an empty input in initial state', () => {
    const output = mount(
      <AutoCompleteSearch
        value={''}
        isLoading={false}
        items={[]}
        onChange={noop}
        onSelect={noop}
        placeholder="PLACEHOLDER"
      />,
    );
    expect(output.find('.AutoComplete').exists()).toBeTruthy();
    const input = output.find('input');
    expect(input.exists()).toBeTruthy();
    expect(output.find('input').prop('className')).not.toContain(
      'AutoComplete-input--loading',
    );
    expect(input.prop('placeholder')).toEqual('PLACEHOLDER');
  });

  it('displays input in loading state', () => {
    const output = mount(
      <AutoCompleteSearch
        value={''}
        isLoading={true}
        items={[]}
        onChange={noop}
        onSelect={noop}
      />,
    );
    expect(output.find('.AutoComplete').exists()).toBeTruthy();
    expect(output.find('input').exists()).toBeTruthy();
    expect(output.find('input').prop('className')).toContain(
      'AutoComplete-input--loading',
    );
  });

  it('calls onChange when user types', () => {
    const onChange = jest.fn();
    const output = mount(
      <AutoCompleteSearch
        value={''}
        isLoading={false}
        items={[]}
        onChange={onChange}
        onSelect={noop}
      />,
    );

    expect(onChange).toHaveBeenCalledTimes(0);

    const input = output.find('input');
    input.simulate('change', { target: { value: 'a' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith('a');
    input.simulate('change', { target: { value: 'abc' } });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith('abc');
  });

  it('calls onSelect when user selects', () => {
    const onSelect = jest.fn();
    const output = mount(
      <AutoCompleteSearch
        value={'abc'}
        isLoading={false}
        items={[{ name: 'one', id: '1' }, { name: 'two', id: '2' }]}
        onChange={noop}
        onSelect={onSelect}
      />,
    );

    const input = output.find('input');
    input.simulate('focus');
    const menu = output.find('.AutoComplete-menu');
    expect(menu.find('.AutoComplete-menuItem').length).toEqual(2);

    input.simulate('keyDown', { key: 'ArrowDown', keyCode: 40, which: 40 });
    const selectedItem = output.find('.AutoComplete-menuItem--highlighted');
    expect(selectedItem.exists()).toBeTruthy();

    expect(onSelect).toHaveBeenCalledTimes(0);
    selectedItem.simulate('click');
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenLastCalledWith('one', { id: '1', name: 'one' });
  });
});
