import styled from 'styled-components';

export interface H1Props {
  color?: string;
  borderColor?: string;
}

const H1 = styled.h1<H1Props>`
  --border-color: ${props => props.borderColor || '#000'};
  color: ${props => props.color || '#000'};
  padding: 0.5em;
  text-align: center;
  border-top: 2px solid var(--border-color);
  border-bottom: 2px solid var(--border-color);
  max-width: 95%;
  margin: 0.2em auto;
`;

export default H1;
