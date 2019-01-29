import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import ListItem from '.';

const stories = storiesOf('Atoms/ListItem', module);
stories.addDecorator(withKnobs);

stories.add('in ordered list', () => {
  return (
    <ol>
      <ListItem>{text('text', 'hello')}</ListItem>
    </ol>
  );
});

stories.add('in unordered list', () => {
  return (
    <ul>
      <ListItem>{text('text', 'hello')}</ListItem>
    </ul>
  );
});
