import { color, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import List, { ListProps } from '.';

const stories = storiesOf('List', module);
stories.addDecorator(withKnobs);

stories.add('list', () => {
  const props: ListProps = {
    items: object('items', [
      { name: 'Place one', link: '#' },
      { name: 'Place two', link: '#' },
      { name: 'Place third', link: '#' },
      { name: 'Place fourth is long', link: '#' },
      { name: 'Place five', link: '#' },
    ]),
    style: {
      '--color': color('title color', '#000'),
      '--link-color': color('theme color', 'crimson'),
    },
    title: text('title', 'Top 5 tourist places:'),
  };

  return (
    <List items={props.items} title={props.title} style={props.style} />
  );
});
