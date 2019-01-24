import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { removeCity } from '../../actions';
import Ad from '../../components/Ad';
import City, { CityProps } from '../../components/City';
import { State } from '../../state';

const mapStateToProps = (state: State) => ({
  cities: state.cities.map(name => ({
    distance: state.distance[name],
    name,
    places: state.places[name],
    weather: state.weather[name],
  })),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    removeCity(name: string) {
      dispatch(removeCity(name));
    },
  };
};

interface Props {
  // from mapState
  cities: CityProps[];
  // from mapDispatch
  removeCity: (name: string) => void;
}

function Cities(props: Props) {
  return (
    <>
      {props.cities.slice(0, 1).map(city => (
        <City {...city} key={city.name} destroyer={props.removeCity} />
      ))}
      <Ad />
      {props.cities.slice(1).map(city => (
        <City {...city} key={city.name} destroyer={props.removeCity} />
      ))}
    </>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cities);
