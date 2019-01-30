import { color, number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import Loader from '.';

const stories = storiesOf('Atoms/Loader', module);
stories.addDecorator(withKnobs);

stories.add('loader', () => {
  const props = {
    color: color('color', '#ff8a00'),
    size: number('size', 50, {
      max: 300,
      min: 20,
      range: true,
      step: 5,
    }),
    speed: select('speed', ['slow', 'normal', 'fast'], 'normal'),
  };
  return <Loader {...props} />;
});
