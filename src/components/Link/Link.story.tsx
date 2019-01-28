import { color, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import Link from '.';

const stories = storiesOf('Link', module);
stories.addDecorator(withKnobs);

stories.add('link with plain text', () => {
  return (
    <Link color={color('color', '#333')} href={text('href', '#')}>
      {text('text', 'hello')}
    </Link>
  );
});
