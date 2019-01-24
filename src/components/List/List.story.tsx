import { color, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { shallow } from 'enzyme';
import * as expect from 'expect';
import { describe, it, specs } from 'storybook-addon-specifications';

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

  const story = (
    <List items={props.items} title={props.title} style={props.style} />
  );

  specs(() =>
    describe('list', () => {
      it('renders title', () => {
        const output = shallow(story);
        expect(output.find('h3').text()).toEqual(props.title);
      });

      it('passes theme style', () => {
        const output = shallow(story);
        expect(output.prop('style')).toMatchObject(props.style);
      });

      it('should display list of items', () => {
        const output = shallow(story);
        expect(output.find('li').map(i => i.text())).toEqual(
          props.items.map(i => i.name),
        );
      });
    }),
  );
  return story;
});
