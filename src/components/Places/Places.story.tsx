import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import Places, { PlacesProps } from '.';

const stories = storiesOf('Places', module);
stories.addDecorator(withKnobs);

stories.add('places', () => {
  const props: PlacesProps = {
    places: object('items', [
      { name: 'Place one', link: '#' },
      { name: 'Place two', link: '#' },
      { name: 'Place third', link: '#' },
      { name: 'Place fourth is long', link: '#' },
      { name: 'Place five', link: '#' },
    ]),
  };

  return <Places places={props.places} />;
});
