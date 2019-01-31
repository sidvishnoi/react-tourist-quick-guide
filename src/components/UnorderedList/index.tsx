import * as React from 'react';
import styled from 'styled-components';

import ListItem from '../ListItem';

const UnorderedList = styled.ul`
  margin: 0.5rem 0 0 0.5rem;
`;

export interface UnorderedListProps {
  items?: React.ReactNode[];
  children?: React.ReactNode[];
  [prop: string]: any;
}

export default (props: UnorderedListProps) => {
  const { items, children, ...rest } = props;
  const listItems = items ? items : children;
  if (!listItems || !Array.isArray(listItems)) {
    return <></>;
  }
  return (
    <UnorderedList {...rest}>
      {listItems.map((item, i) => (
        <ListItem key={i}>{item}</ListItem>
      ))}
    </UnorderedList>
  );
};
