import * as React from 'react';
import { storiesOf, forceReRender } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { specs, describe, it } from 'storybook-addon-specifications';
import { shallow } from 'enzyme';
import * as expect from 'expect';
import { action } from '@storybook/addon-actions';
import AutoCompleteSearch from '.';

const allItems = [
  { id: 'AL', name: 'Alabama' },
  { id: 'AK', name: 'Alaska' },
  { id: 'AZ', name: 'Arizona' },
  { id: 'AR', name: 'Arkansas' },
  { id: 'CA', name: 'California' },
  { id: 'CO', name: 'Colorado' },
  { id: 'CT', name: 'Connecticut' },
  { id: 'DE', name: 'Delaware' },
  { id: 'FL', name: 'Florida' },
  { id: 'GA', name: 'Georgia' },
  { id: 'HI', name: 'Hawaii' },
  { id: 'ID', name: 'Idaho' },
  { id: 'IL', name: 'Illinois' },
  { id: 'IN', name: 'Indiana' },
  { id: 'IA', name: 'Iowa' },
  { id: 'KS', name: 'Kansas' },
  { id: 'KY', name: 'Kentucky' },
  { id: 'LA', name: 'Louisiana' },
  { id: 'ME', name: 'Maine' },
  { id: 'MD', name: 'Maryland' },
  { id: 'MA', name: 'Massachusetts' },
  { id: 'MI', name: 'Michigan' },
  { id: 'MN', name: 'Minnesota' },
  { id: 'MS', name: 'Mississippi' },
  { id: 'MO', name: 'Missouri' },
  { id: 'MT', name: 'Montana' },
  { id: 'NE', name: 'Nebraska' },
  { id: 'NV', name: 'Nevada' },
  { id: 'NH', name: 'New Hampshire' },
  { id: 'NJ', name: 'New Jersey' },
  { id: 'NM', name: 'New Mexico' },
  { id: 'NY', name: 'New York' },
  { id: 'NC', name: 'North Carolina' },
  { id: 'ND', name: 'North Dakota' },
  { id: 'OH', name: 'Ohio' },
  { id: 'OK', name: 'Oklahoma' },
  { id: 'OR', name: 'Oregon' },
  { id: 'PA', name: 'Pennsylvania' },
  { id: 'RI', name: 'Rhode Island' },
  { id: 'SC', name: 'South Carolina' },
  { id: 'SD', name: 'South Dakota' },
  { id: 'TN', name: 'Tennessee' },
  { id: 'TX', name: 'Texas' },
  { id: 'UT', name: 'Utah' },
  { id: 'VT', name: 'Vermont' },
  { id: 'VA', name: 'Virginia' },
  { id: 'WA', name: 'Washington' },
  { id: 'WV', name: 'West Virginia' },
  { id: 'WI', name: 'Wisconsin' },
  { id: 'WY', name: 'Wyoming' },
];

const createSuggestions = (prefix: string) => {
  if (!prefix.length) return [];
  return allItems.filter(s =>
    s.name.toLowerCase().startsWith(prefix.toLowerCase()),
  );
};

let value = '';
const onChange = (val: string) => {
  value = val.trim();
  forceReRender();
  action('onChange')(value);
};

const onSelect = (val: string) => {
  value = val.trim();
  forceReRender();
  action('onSelect')(value);
};

const stories = storiesOf('AutoCompleteSearch', module);
stories.addDecorator(withKnobs);

stories.add('with sync predictor', () => {
  const story = (
    <AutoCompleteSearch
      onChange={onChange}
      onSelect={onSelect}
      id="search-1"
      value={value}
      items={createSuggestions(value)}
      isLoading={boolean('isLoading', false)}
      placeholder={text('Placeholder', 'Location')}
    />
  );

  specs(() =>
    describe('with sync predictor', () => {
      it('should display an empty input', () => {
        const output = shallow(story);
        expect(output.prop('className')).toEqual('AutoComplete');
        // console.log(output.html());
        // expect(output.find('input').exists()).toBeTruthy();
      });
    }),
  );
  return story;
});
