import * as React from 'react';
import styled from 'styled-components';

const H3 = styled.h3<{ color: string }>`
  --color: ${props => props.color};
  color: var(--color);
  padding: 0.5rem;

  @media print {
    padding: 0 0.5rem 0.2rem;
    --color: #000;
  }
`;

const H3WithBorder = styled(H3)`
  border-bottom: 2px solid var(--color);
`;

export interface H3Props {
  children: React.ReactNode;
  bordered?: boolean;
  color?: string;
}

export default (props: H3Props) => {
  const { bordered = false, color = '#000', children } = props;
  return bordered ? (
    <H3WithBorder color={color}>{children}</H3WithBorder>
  ) : (
    <H3 color={color}>{children}</H3>
  );
};
