import * as React from 'react';
import styled from 'styled-components';

import IconButton from '../IconButton';

const CityMeta = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: transparent;
  width: 200px;

  .buttons {
    display: flex;
    flex-direction: column;
    width: 30px;

    @media print {
      display: none;
    }
  }

  @media print {
    justify-content: flex-start;
    width: auto;
    max-width: 200px;
  }
`;

const CityName = styled.h3`
  font-size: 2rem;
  text-align: center;
  padding: 0.2rem 0.5rem;
  color: #000;

  @media print {
    padding: 0;
    text-align: left;
  }
`;

const Distance = styled.div`
  text-align: right;
  padding: 1rem;
  font-size: 1.2rem;

  @media print {
    padding: 0;
    text-align: left;
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
        />
        <IconButton
          icon="✗"
          className="remove"
          title="Remove from list"
          onClick={() => onRemoveButtonClick(name)}
        />
      </div>
      <CityName>{name}</CityName>
      <Distance>
        {distance !== null ? `${distance} KM` : '...'}
      </Distance>
    </CityMeta>
  );
};
