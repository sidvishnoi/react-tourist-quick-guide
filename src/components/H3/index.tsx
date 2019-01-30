import styled, { css } from 'styled-components';

export interface H3Props {
  bordered?: boolean;
  color?: string;
}

const H3 = styled.h3<H3Props>`
  --color: ${props => props.color || '#000'};
  color: var(--color);
  padding: 0.5rem;

  @media print {
    padding: 0 0.5rem 0.2rem;
    --color: #000;
  }

  ${props =>
    props.bordered &&
    css`
      border-bottom: 2px solid var(--color);
      @media print {
        border-bottom: none;
      }
    `}
`;

export default H3;
