import { array, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import UnorderedList from '.';

const stories = storiesOf('UnorderedList', module);
stories.addDecorator(withKnobs);

stories.add('with plain text items', () => {
  const items = array('items', ['One', 'Two', 'Three']);
  const listStyleType = text('list-style-type', 'square');

  return <UnorderedList items={items} style={{ listStyleType }} />;
});
