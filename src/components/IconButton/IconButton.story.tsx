import { action } from '@storybook/addon-actions';
import { color, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import IconButton from '.';

const stories = storiesOf('IconButton', module);
stories.addDecorator(withKnobs);

stories.add('with simple icon text', () => {
  return (
    <IconButton
      icon={text('text', '∆')}
      background={color('background', 'gold')}
      color={color('color', 'crimson')}
      altColor={color('altColor', '#fff')}
      title={text('title', 'TITLE')}
    />
  );
});

stories.add('with onClick handler', () => {
  return <IconButton icon="∆" onClick={() => action('onClick')()} />;
});
