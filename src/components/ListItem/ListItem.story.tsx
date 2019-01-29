import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import ListItem from '.';

const stories = storiesOf('ListItem', module);
stories.addDecorator(withKnobs);

stories.add('with plain text', () => {
  return <ListItem>{text('text', 'hello')}</ListItem>;
});
