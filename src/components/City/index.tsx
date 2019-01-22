import * as React from 'react';
import Weather, { WeatherProps } from '../../components/Weather';
import List from '../../components/List';
import './City.css';

export interface CityProps {
  id: string;
  name: string;
  weather?: WeatherProps;
  places?: { name: string; link: string }[];
  distance?: number;
}

interface CityPropsFromDispatch {
  destroyer: (name: string) => void;
}

export default function City(props: CityProps & CityPropsFromDispatch) {
  const { weather, name, id, distance, places } = props;
  return (
    <div className="City">
      <div className="meta">
        <button
          className="close"
          title="Remove from list"
          onClick={() => props.destroyer(id)}
        >
          X
        </button>
        <h3>{name}</h3>
        <div className="distance">{distance} KM</div>
      </div>
      <div className="widget">
        <Weather
          temperature={weather.temperature}
          unit={weather.unit}
          icon={weather.icon}
          summary={weather.summary}
          forecast={weather.forecast}
        />
      </div>
      <div className="widget">
        <List items={places} title={`Top ${places.length} Tourist Places:`} />
      </div>
    </div>
  );
}
