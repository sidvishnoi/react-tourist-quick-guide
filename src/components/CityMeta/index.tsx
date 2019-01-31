import * as React from 'react';
import styled from 'styled-components';

import IconButton from '../IconButton';
import { Typography } from '../Text';

const CityMeta = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: #000;
  width: 200px;
  padding: 0.2em;

  .buttons {
    display: flex;
    justify-content: space-between;

    @media print {
      display: none;
    }
  }

  @media print {
    justify-content: flex-start;
    width: auto;
    max-width: 200px;
    background: #fff;
  }
`;

const CityName = styled(Typography)`
  text-align: center;
  margin: 0.5rem auto;

  @media print {
    padding: 0;
    margin: 0;
    text-align: left;
    color: #000;
  }
`;

const Distance = styled(Typography)`
  text-align: right;
  padding: 0.5rem;

  @media print {
    padding: 0;
    text-align: left;
    color: #000;
  }
`;

export interface CityMetaProps {
  name: string;
  onMoveButtonClick: (name: string) => void;
  onRemoveButtonClick: (name: string) => void;
  distance: number;
}

export default (props: CityMetaProps) => {
  const { name, onMoveButtonClick, onRemoveButtonClick, distance } = props;
  return (
    <CityMeta>
      <div className="buttons">
        <IconButton
          icon="⬆"
          className="move"
          title="Move destination up in list"
          onClick={() => onMoveButtonClick(name)}
          color="#fff"
          altColor="cornflowerblue"
        />
        <IconButton
          icon="✗"
          className="remove"
          title="Remove from list"
          onClick={() => onRemoveButtonClick(name)}
          color="#fff"
          altColor="red"
        />
      </div>
      <CityName as="h2" color="#fff" size="fsize_08">
        {name}
      </CityName>
      <Distance as="span" color="#fff" size="fsize_04">
        {distance !== null ? `${distance} KM` : '...'}
      </Distance>
    </CityMeta>
  );
};
