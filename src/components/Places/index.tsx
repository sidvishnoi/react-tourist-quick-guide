import * as React from 'react';

import Link from '../Link';
import Text from '../Text';
import UnorderedList from '../UnorderedList';

export interface PlacesProps {
  places: {
    title: string;
    link: string;
    summary: string;
  }[];
  [prop: string]: any;
}

export default function(props: PlacesProps) {
  const { places } = props;
  return (
    <div>
      <Text as="h3" size="fsize_05">
        Top tourist places:
      </Text>
      <UnorderedList>
        {places.map((place, i) => (
          <span key={i}>
            <Link href={place.link}>{place.title}</Link>:{' '}
            <em>{place.summary}</em>
          </span>
        ))}
      </UnorderedList>
    </div>
  );
}
