import * as React from 'react';
import { State } from '../../reducers';
import { Dispatch } from 'redux';
import City, { CityProps } from '../../components/City';
import { connect } from 'react-redux';
import Ad from '../../components/Ad';

const mapStateToProps = (state: State) => ({
  cities: state.cities.allIds.map(id => ({
    ...state.cities.byId[id],
    id,
  })),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    removeCity(id: string) {
      dispatch({ type: 'REMOVE_CITY', id });
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
        <City {...city} key={city.id} destroyer={props.removeCity} />
      ))}
      <Ad />
      {props.cities.slice(1).map(city => (
        <City {...city} key={city.id} destroyer={props.removeCity} />
      ))}
    </>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cities);
