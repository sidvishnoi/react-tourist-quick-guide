import * as React from 'react';
import styled from 'styled-components';

export interface ListProps {
  title: string;
  items: {
    name: string;
    link: string;
  }[];
  [prop: string]: any;
}

type ListStyleProps = Partial<{
  color1: string;
  color2: string;
}>;

const List = styled.div``;

const Heading = styled.h3`
  color: ${(props: ListStyleProps) => props.color1 || '#000'};
  padding: 0.5rem;
  border-bottom: 2px solid
    ${(props: ListStyleProps) => props.color2 || 'crimson'};
`;

const UnorderedList = styled.ul`
  margin: 0.5rem 0 0 2rem;
`;

const ListItem = styled.li`
  margin: 0.2rem 0;
`;

const ListItemLink = styled.a`
  text-decoration: none;
  color: ${(props: { color: string }) => props.color || 'crimson'};

  :hover,
  :focus {
    text-decoration: underline;
  }
`;

export default function(props: ListProps & ListStyleProps) {
  const { title, items, color1, color2, ...rest } = props;
  return (
    <List {...rest}>
      <Heading color1={color1} color2={color2}>
        {title}
      </Heading>
      <UnorderedList>
        {items.map((place, i) => (
          <ListItem key={i}>
            <ListItemLink href={place.link} color={color2}>
              {place.name}
            </ListItemLink>
          </ListItem>
        ))}
      </UnorderedList>
    </List>
  );
}
