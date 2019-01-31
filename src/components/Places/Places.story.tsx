import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import Places, { PlacesProps } from '.';

const stories = storiesOf('Places', module);
stories.addDecorator(withKnobs);

stories.add('places', () => {
  const props: PlacesProps = {
    places: object('items', [
      { title: 'Place one', link: '#', summary: 'this is a summary' },
      { title: 'Place two', link: '#', summary: 'this is a longer summary' },
      { title: 'Place third', link: '#', summary: 'this is a summary' },
      {
        link: '#',
        summary: 'this is a summary',
        title: 'Place fourth is long',
      },
      { title: 'Place five', link: '#', summary: 'this is a summary' },
    ]),
  };

  return <Places places={props.places} />;
});
