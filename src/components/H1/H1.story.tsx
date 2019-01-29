import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import H1 from '.';

const stories = storiesOf('Atoms/H1', module);
stories.addDecorator(withKnobs);

stories.add('simple', () => {
  return <H1>{text('text', 'Hello World')}</H1>;
});
