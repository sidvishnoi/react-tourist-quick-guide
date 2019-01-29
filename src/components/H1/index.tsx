import * as React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  padding: 1em 1em 0;
  text-align: center;
`;

export interface H1Props {
  children: React.ReactNode;
}

export default (props: H1Props) => {
  const { children } = props;
  return <H1>{children}</H1>;
};
