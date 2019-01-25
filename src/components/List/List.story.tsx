import { color, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import List, { ListProps } from '.';

const stories = storiesOf('List', module);
stories.addDecorator(withKnobs);

stories.add('list', () => {
  const props: ListProps = {
    color1: color('color1: title color', '#000'),
    color2: color('color2: theme color', 'crimson'),
    items: object('items', [
      { name: 'Place one', link: '#' },
      { name: 'Place two', link: '#' },
      { name: 'Place third', link: '#' },
      { name: 'Place fourth is long', link: '#' },
      { name: 'Place five', link: '#' },
    ]),
    title: text('title', 'Top 5 tourist places:'),
  };

  return <List {...props} />;
});
