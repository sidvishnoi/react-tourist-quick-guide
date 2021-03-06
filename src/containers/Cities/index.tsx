import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { moveCityUp, removeCity } from '../../actions';
import Ad from '../../components/Ad';
import City, { CityProps } from '../../components/City';
import { State } from '../../state';

const mapStateToProps = ({ cities }: State) => ({
  cities: cities.allIds.map(name => ({
    distance: cities.byId[name].distance,
    name,
    places: cities.byId[name].places,
    weather: cities.byId[name].weather,
  })),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    removeCity(name: string) {
      dispatch(removeCity(name));
    },
    moveCityUp(name: string) {
      dispatch(moveCityUp(name));
    },
  };
};

interface Props {
  // from mapState
  cities: CityProps[];
  // from mapDispatch
  removeCity: (name: string) => void;
  moveCityUp: (name: string) => void;
}

function Cities(props: Props) {
  return (
    <>
      {props.cities.slice(0, 1).map(city => (
        <City
          {...city}
          key={city.name}
          destroyer={props.removeCity}
          mover={props.moveCityUp}
        />
      ))}
      <Ad />
      {props.cities.slice(1).map(city => (
        <City
          {...city}
          key={city.name}
          destroyer={props.removeCity}
          mover={props.moveCityUp}
        />
      ))}
    </>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cities);
