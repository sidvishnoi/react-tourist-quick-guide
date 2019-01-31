import * as React from 'react';
import styled from 'styled-components';

export const fontSize = {
  fsize_01: {
    size: '0.6875rem',
    lineHeight: '1rem',
  },
  fsize_02: {
    size: '0.75rem',
    lineHeight: '1.125rem',
  },
  fsize_03: {
    size: ' 0.875rem',
    lineHeight: '1.313rem',
  },
  fsize_03B: {
    size: ' 1rem',
    lineHeight: '1.5rem',
  },
  fsize_04: {
    size: '1.125rem',
    lineHeight: '1.5rem',
  },
  fsize_05: {
    size: '1.25rem',
    lineHeight: '1.625rem',
  },
  fsize_06: {
    size: '1.5rem',
    lineHeight: '2rem',
  },
  fsize_07: {
    size: '1.75rem',
    lineHeight: '2.25rem',
  },
  fsize_08: {
    size: '2.125rem',
    lineHeight: '2.75rem',
  },
  fsize_09: {
    size: '3rem',
    lineHeight: '3.5rem',
  },
};

export interface TextProps {
  as: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  family: string;
  color: string;
  size: keyof typeof fontSize;
  children: React.ReactNode;
  [prop: string]: any;
}

const Typography = styled.text<TextProps>`
  font-family: ${props => props.family};
  color: ${props => props.color};
  font-size: ${props => fontSize[props.size].size};
  line-height: ${props => fontSize[props.size].lineHeight};
  margin: 0.2rem 0;

  ${props =>
    (props.as === 'span' || props.as === 'div') &&
    `
    margin: 0;
  `}

  ${props =>
    props.as === 'h1' &&
    `
    padding: 1rem;
    text-align: center;
    border-top: 2px solid ${props.borderColor};
    border-bottom: 2px solid ${props.borderColor};
    margin: 0.2rem auto;
  `}
`;

Typography.defaultProps = {
  as: 'p',
  borderColor: '#000',
  color: '#000',
  family: 'serif',
  size: 'fsize_01',
};

const Text = (props: Partial<TextProps>) => {
  const { children, ...rest } = props;
  return <Typography {...rest}>{children}</Typography>;
};

export default Text;
export { Typography };
