import * as React from 'react';
import styled from 'styled-components';

import IconButton from '../IconButton';

const CityMeta = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background: #000;
  color: #fff;
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
    color: #000;
  }
`;

const CityName = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin: 0.5rem auto;
  padding: 0.2rem 0.5rem;

  @media print {
    padding: 0;
    margin: 0;
    text-align: left;
  }
`;

const Distance = styled.div`
  text-align: right;
  padding: 0.5rem;

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
      <CityName>{name}</CityName>
      <Distance>{distance !== null ? `${distance} KM` : '...'}</Distance>
    </CityMeta>
  );
};
