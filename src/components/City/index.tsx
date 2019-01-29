import * as React from 'react';
import styled from 'styled-components';

import CityMeta from '../CityMeta';
import Places from '../Places';
import Weather, { WeatherProps } from '../Weather';
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

export default function(props: CityProps & CityPropsFromDispatch) {
  const { weather, places, distance } = props;
  const placesProps = {
    props: { places: places.data },
    state: places.state,
  };
  const weatherProps = {
    props: { ...weather.data },
    state: weather.state,
  };
  return (
    <City>
      <CityMeta
        name={props.name}
        distance={distance.data}
        onMoveButtonClick={props.mover}
        onRemoveButtonClick={props.destroyer}
      />
      <Widget props={weatherProps} component={Weather} />
      <Widget props={placesProps} component={Places} />
    </City>
  );
}
