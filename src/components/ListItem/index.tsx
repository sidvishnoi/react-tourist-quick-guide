import * as React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  margin: 0.2rem 0;

  > * {
    margin: 0;
    padding: 0;
    display: inline-block;
  }
`;

export interface ListItemProps {
  children?: React.ReactNode;
}

export default (props: ListItemProps) => {
  return <ListItem>{props.children}</ListItem>;
};
