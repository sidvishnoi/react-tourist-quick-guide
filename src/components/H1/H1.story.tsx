import { color, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import H1 from '.';

const stories = storiesOf('Atoms/H1', module);
stories.addDecorator(withKnobs);

stories.add('simple', () => {
  return (
    <H1
      color={color('color', '#000')}
      borderColor={color('border-color', '#000')}
    >
      {text('text', 'Hello World')}
    </H1>
  );
});
