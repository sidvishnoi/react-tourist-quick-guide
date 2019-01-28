import * as React from 'react';
import styled from 'styled-components';

import List from '../../components/List';
import Weather, { WeatherProps } from '../../components/Weather';
import Widget from '../Widget';

export interface CityProps {
  name: string;
  weather: { state: string; data: WeatherProps };
  places: { state: string; data: { name: string; link: string }[] };
  distance: { state: string; data: number };
}

interface CityPropsFromDispatch {
  destroyer?: (name: string) => void;
  mover?: (name: string) => void;
}

const City = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: linear-gradient(to right, #ff8a00, #da1b60);
  margin: 1em auto;
  padding: 0.2em;
  transition: all 0.2s ease;

  :hover {
    border-image: linear-gradient(to right, #ff8a00, #da1b60) 1 1;
  }

  > div {
    flex-grow: 1;
  }

  @media print {
    background: #fff;
    border-bottom: 2px solid #000;
  }
`;

const Meta = styled.div`
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

const Button = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 0.5rem;
  margin: 0.1rem;
  color: crimson;

  :hover,
  :focus {
    background: crimson;
    color: #fff;
    cursor: pointer;
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

const DistanceValue = styled.div`
  text-align: right;
  padding: 1rem;
  font-size: 1.2rem;

  @media print {
    padding: 0;
    text-align: left;
  }
`;

export default function(props: CityProps & CityPropsFromDispatch) {
  const { weather, places, name, distance } = props;
  const placesProps = {
    data: places.data
      ? {
          items: places.data,
          title: `Top ${places.data.length} tourist places:`,
        }
      : places.data,
    state: places.state,
  };
  return (
    <City>
      <Meta>
        <div className="buttons">
          {props.mover && (
            <Button
              className="move"
              title="Move destination up in list"
              onClick={() => props.mover(name)}
            >
              ⬆
            </Button>
          )}
          {props.destroyer && (
            <Button
              className="remove"
              title="Remove from list"
              onClick={() => props.destroyer(name)}
            >
              ✗
            </Button>
          )}
        </div>
        <CityName>{name}</CityName>
        {distance && distance.state === 'ready' ? (
          <DistanceValue>{distance.data} KM</DistanceValue>
        ) : (
          <DistanceValue>...</DistanceValue>
        )}
      </Meta>
      <Widget props={weather} component={Weather} />
      <Widget props={placesProps} component={List} />
    </City>
  );
}
