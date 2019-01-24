import { shallow } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import React = require('react');
Enzyme.configure({ adapter: new Adapter() });

import AutoCompleteSearch from '.';

const noop = (): null => null;

describe('Components - AutoCompleteSearch', () => {
  it('should display an empty input', () => {
    const output = shallow(
      <AutoCompleteSearch
        value={''}
        isLoading={false}
        items={[]}
        onChange={noop}
        onSelect={noop}
      />,
    );
    expect(output.prop('className')).toEqual('AutoComplete');
    // console.log(output.html());
    // expect(output.find('input').exists()).toBeTruthy();
  });
});
