import { color, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import Link from '.';

const stories = storiesOf('Atoms/Link', module);
stories.addDecorator(withKnobs);

stories.add('with plain text', () => {
  return (
    <Link color={color('color', '#333')} href={text('href', '#')}>
      {text('text', 'hello')}
    </Link>
  );
});
