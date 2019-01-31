import { color, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import Text, { fontSize, TextProps } from '.';

const stories = storiesOf('Typography', module);
stories.addDecorator(withKnobs);

stories.add('Typography', () => {
  const props = {
    as: select(
      'as',
      ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
      'p',
    ),
    color: color('color', '#000'),
    family: text('family', 'sans-serif'),
    size: select(
      'size',
      Object.keys(fontSize) as TextProps['size'][],
      'fsize_03',
    ),
  };
  return (
    <Text
      as={props.as}
      family={props.family}
      size={props.size}
      color={props.color}
    >
      {text(
        'text',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
          ' Duis sed neque ac tortor viverra sagittis non nec massa.',
      )}
    </Text>
  );
});
