import * as React from 'react';

import H3 from '../H3';
import Link from '../Link';
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
  const title = `Top ${places.length} tourist places:`;
  return (
    <div>
      <H3 bordered>{title}</H3>
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
