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

const List = styled.div``;

const Heading = styled.h3<{
  color1?: string;
  color2?: string;
}>`
  color: ${props => props.color1 || '#000'};
  padding: 0.5rem;
  border-bottom: 2px solid ${props => props.color2 || 'crimson'};

  @media print {
    padding: 0 0.5rem 0.2rem;
    color: #000;
  }
`;

const UnorderedList = styled.ul`
  margin: 0.5rem 0 0 2rem;
`;

const ListItem = styled.li`
  margin: 0.2rem 0;
`;

const ListItemLink = styled.a<{ color?: string }>`
  text-decoration: none;
  color: ${props => props.color || 'crimson'};

  :hover,
  :focus {
    text-decoration: underline;
  }

  @media print {
    color: #000;
  }
`;

export default function(props: ListProps) {
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
