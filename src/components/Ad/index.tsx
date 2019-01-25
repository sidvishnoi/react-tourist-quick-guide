import * as React from 'react';
import styled from 'styled-components';

const AdSpace = styled.div`
  background: #eee;
  margin: 0.5em auto;
  padding: 1em;
  text-align: center;

  @media print {
    display: none;
  }
`;

export default function Ad() {
  return <AdSpace>Advertisement Space</AdSpace>;
}
