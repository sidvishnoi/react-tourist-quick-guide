import * as React from 'react';
import styled from 'styled-components';

import ListItem from '../ListItem';

const UnorderedList = styled.ul`
  margin: 0.5rem 0 0 2rem;
`;

export interface UnorderedListProps {
  items: React.ReactNode[];
  [prop: string]: any;
}

export default (props: UnorderedListProps) => {
  const { items, ...rest } = props;
  return (
    <UnorderedList {...rest}>
      {items.map((item, i) => (
        <ListItem key={i}>{item}</ListItem>
      ))}
    </UnorderedList>
  );
};
