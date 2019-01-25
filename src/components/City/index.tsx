import * as React from 'react';
import List from '../../components/List';
import Weather, { WeatherProps } from '../../components/Weather';
import Widget from '../Widget';
import './City.css';

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

export default function City(props: CityProps & CityPropsFromDispatch) {
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
    <div className="City">
      <div className="meta">
        <div className="buttons">
          {props.mover && (
            <button
              className="move"
              title="Move destination up in list"
              onClick={() => props.mover(name)}
            >
              ⬆
            </button>
          )}
          {props.destroyer && (
            <button
              className="remove"
              title="Remove from list"
              onClick={() => props.destroyer(name)}
            >
              ✗
            </button>
          )}
        </div>
        <h3>{name}</h3>
        {distance && distance.state === 'ready' ? (
          <div className="distance">{distance.data} KM</div>
        ) : (
          <div className="distance">...</div>
        )}
      </div>
      <Widget props={weather} component={Weather} />
      <Widget props={placesProps} component={List} />
    </div>
  );
}
