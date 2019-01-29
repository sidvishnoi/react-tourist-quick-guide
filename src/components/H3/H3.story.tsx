import { text, withKnobs, color } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import H3 from '.';

const stories = storiesOf('Atoms/H3', module);
stories.addDecorator(withKnobs);

stories.add('simple', () => {
  return <H3>{text('text', 'This is h3 heading')}</H3>;
});

stories.add('with border', () => {
  return <H3 bordered>{text('text', 'This is h3 heading')}</H3>;
});

stories.add('with color', () => {
  return (
    <H3 bordered color={color('color', 'crimson')}>
      {text('text', 'This is h3 heading')}
    </H3>
  );
});
