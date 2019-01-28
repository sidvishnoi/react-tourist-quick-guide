import * as React from 'react';
import styled from 'styled-components';

const Link = styled.a<{ color: string }>`
  text-decoration: none;
  color: ${props => props.color};

  :hover,
  :focus {
    text-decoration: underline;
  }

  @media print {
    color: #000;
  }
`;

export interface LinkProps {
  href: string;
  children: any;
  color?: string;
  [prop: string]: any;
}

export default function(props: LinkProps) {
  const { color = '#333', href, children, ...rest } = props;
  return (
    <Link color={color} href={href} {...rest}>
      {children}
    </Link>
  );
}
