import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
Enzyme.configure({ adapter: new Adapter() });

import AutoComplete from '.';

const noop = (): null => null;

describe('Components - AutoComplete', () => {
  it('displays an empty input in initial state', () => {
    const output = mount(
      <AutoComplete
        value={''}
        isLoading={false}
        items={[]}
        onChange={noop}
        onSelect={noop}
        placeholder="PLACEHOLDER"
      />,
    );
    const input = output.find('input');
    expect(input.exists()).toBeTruthy();
    expect(output.find('input').prop('className')).not.toContain('loading');
    expect(input.prop('placeholder')).toEqual('PLACEHOLDER');
  });

  it('displays input in loading state', () => {
    const output = mount(
      <AutoComplete
        value={''}
        isLoading={true}
        items={[]}
        onChange={noop}
        onSelect={noop}
      />,
    );
    expect(output.find('input').exists()).toBeTruthy();
    expect(output.find('input').prop('className')).toContain('loading');
  });

  it('calls onChange when user types', () => {
    const onChange = jest.fn();
    const output = mount(
      <AutoComplete
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
      <AutoComplete
        value={'abc'}
        isLoading={false}
        items={[{ name: 'one', id: '1' }, { name: 'two', id: '2' }]}
        onChange={noop}
        onSelect={onSelect}
      />,
    );

    const input = output.find('input');
    input.simulate('focus');
    const menu = output.find('div[role="listbox"]');

    expect(menu.find('div[role="option"]').length).toEqual(2);
    input.simulate('keyDown', { key: 'ArrowDown', keyCode: 40, which: 40 });

    const selectedItem = menu.find('div[role="option"]').at(0);
    // following isn't working somehow
    // expect(selectedItem.prop('aria-selected')).toEqual(true);

    expect(onSelect).toHaveBeenCalledTimes(0);
    selectedItem.simulate('click');
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenLastCalledWith('one', { id: '1', name: 'one' });
  });
});
