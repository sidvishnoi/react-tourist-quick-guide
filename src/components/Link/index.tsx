import styled from 'styled-components';

export interface LinkProps {
  href: string;
  color?: string;
  [prop: string]: any;
}

const Link = styled.a<LinkProps>`
  text-decoration: none;
  color: ${props => props.color || '#333'};

  :hover,
  :focus {
    text-decoration: underline;
  }

  @media print {
    color: #000;
  }
`;

export default Link;
