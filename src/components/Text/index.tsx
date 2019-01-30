import * as React from 'react';
import styled from 'styled-components';

interface TextProps {
  as: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  family: string;
  color: string;
  size: string;
  children: React.ReactNode;
  [prop: string]: any;
}

const Text = styled.text<TextProps>`
  font-family: ${props => props.family};
  color: ${props => props.color};
  font-size: ${props => props.size};
  line-height: 1.5;
`;

export default (props: Partial<TextProps>) => {
  const {
    as = 'p',
    family = 'sans-serif',
    color = '#000',
    size = '1em',
    children,
    ...rest
  } = props;
  return (
    <Text as={as} family={family} color={color} size={size} {...rest}>
      {children}
    </Text>
  );
};
