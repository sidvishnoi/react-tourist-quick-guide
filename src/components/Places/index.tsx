import * as React from 'react';

import H3 from '../H3';
import Link from '../Link';
import UnorderedList from '../UnorderedList';

export interface PlacesProps {
  places: {
    name: string;
    link: string;
  }[];
  [prop: string]: any;
}

export default function(props: PlacesProps) {
  const { places } = props;
  const title = `Top ${places.length} tourist places:`;
  return (
    <div>
      <H3 bordered>{title}</H3>
      <UnorderedList>
        {places.map((place, i) => (
          <Link href={place.link} key={i}>
            {place.name}
          </Link>
        ))}
      </UnorderedList>
    </div>
  );
}
