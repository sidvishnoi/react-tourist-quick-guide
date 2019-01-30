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
  justify-content: flex-start;
  margin: 1em auto;
  border: 2px solid #000;
  max-width: 900px;

  > div {
    max-width: 300px;
    flex-grow: 1;
  }

  @media screen and (max-width: 700px) {
    > div {
      max-width: 100%;
    }
  }

  @media print {
    background: #fff;
    border: none;
    border-bottom: 2px solid #000;
    padding: 0.5rem 0;
    page-break-inside: avoid;

    > div {
      width: 33%;
      flex-grow: unset;
    }
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
