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
  destroyer: (name: string) => void;
  mover: (name: string) => void;
}

export default function City(props: CityProps & CityPropsFromDispatch) {
  const { weather, places, name, distance } = props;
  return (
    <div className="City">
      <div className="meta">
        <div className="buttons">
          <button
            className="move"
            title="Move destination up in list"
            onClick={() => props.mover(name)}
          >
            ⬆
          </button>
          <button
            className="close"
            title="Remove from list"
            onClick={() => props.destroyer(name)}
          >
            ❎
          </button>
        </div>
        <h3>{name}</h3>
        {distance && distance.state === 'ready' ? (
          <div className="distance">{distance.data} KM</div>
        ) : (
          <div className="distance">...</div>
        )}
      </div>
      {weather && (
        <Widget state={weather.state}>
          {weather.state === 'ready' && (
            <Weather
              temperature={weather.data.temperature}
              unit={weather.data.unit}
              icon={weather.data.icon}
              summary={weather.data.summary}
              forecast={weather.data.forecast}
            />
          )}
        </Widget>
      )}
      {places && (
        <Widget state={places.state}>
          {places.state === 'ready' && (
            <List
              items={places.data}
              title={`Top ${places.data.length} Tourist Places:`}
            />
          )}
        </Widget>
      )}
    </div>
  );
}
