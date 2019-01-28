import * as React from 'react';
import styled from 'styled-components';

interface IconButtonStyleProps {
  background: string;
  color: string;
  altColor: string;
}

const IconButton = styled.button<IconButtonStyleProps>`
  background: ${props => props.background};
  border: none;
  padding: 0.5rem;
  margin: 0.1rem;
  color: ${props => props.color};

  :hover,
  :focus {
    background: ${props => props.color};
    color: ${props => props.altColor};
    cursor: pointer;
  }
`;

export interface IconButtonProps extends Partial<IconButtonStyleProps> {
  icon: string;
  onClick?: () => void;
  [prop: string]: any;
}

export default (props: IconButtonProps) => {
  const {
    icon,
    color = 'crimson',
    altColor = '#fff',
    background = 'rgba(255, 255, 255, 0.2)',
    onClick,
    ...rest
  } = props;
  return (
    <IconButton
      background={background}
      color={color}
      altColor={altColor}
      onClick={onClick}
      {...rest}
    >
      {props.icon}
    </IconButton>
  );
};
