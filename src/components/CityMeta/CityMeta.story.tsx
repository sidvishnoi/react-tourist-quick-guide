import { action } from '@storybook/addon-actions';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import CityMeta from '.';

const stories = storiesOf('CityMeta', module);
stories.addDecorator(withKnobs);

stories.add('CityMeta', () => {
  return (
    <CityMeta
      onMoveButtonClick={() => action('onMoveButtonClick')()}
      onRemoveButtonClick={() => action('onRemoveButtonClick')()}
      name={text('name', 'City Name')}
      distance={number('distance', 40)}
    />
  );
});
