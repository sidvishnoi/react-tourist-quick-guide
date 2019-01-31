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
  return (
    <div>
      <H3 bordered>Top tourist places:</H3>
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
